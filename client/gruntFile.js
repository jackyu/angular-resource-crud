
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-html2js');


  // 註冊一個新的 task，名稱為 timestamp，目地是打出時間碼
  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({

    distdir: 'dist',
    
    // 這是在讀取 /client/package.json 裏的設定值
    pkg: grunt.file.readJSON('package.json'),
    
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    
    // 一個巨大的 config obj，內塞多層變數
    cfg: {

      js: ['src/**/*.js'],
      jsTpl: ['<%= distdir %>/templates/**/*.js'],
      
      specs: ['test/**/*.spec.js'],
      scenarios: ['test/**/*.scenario.js'],
      
      html: ['src/index.html'],
      
      // 存 template 的地方
      tpl: {
        app: ['src/app/**/*.tpl.html'],
        common: ['src/common/**/*.tpl.html']
      }
    },

    
    //========================================================================
    //
    // 下面開始是 task 

    // 它的用法最單純，array 裏放要清空的路徑就好
    clean: {

      all: ['<%= distdir %>/*'],
      
      // sass 會先 compile 後放到 assets/css/ 下面，因此這個目錄可砍掉
      remove_sass: ['<%= distdir %>/assets/sass']

    },

    // 將 asset 檔案全部複製到 /dist 下面
    copy: {

      // src/asset
      assets: {
        files: [{ dest: '<%= distdir %>/assets', src : '**', expand: true, cwd: 'src/assets/' }]
      },

      // sui 整個搬過去
      sui: {
        files: [{ dest: '<%= distdir %>/vendor/sui', src : '**', expand: true, cwd: 'vendor/sui/' }]
      },

      // vendor/*.js 整個搬過去，不包含 bower_components
      js: {
        files: [{ dest: '<%= distdir %>/vendor', src : '*.js', expand: true, cwd: 'vendor/' }]
      }

    },
    
    // 將 template 全組合成一個大字串
    html2js: {
    
      app: {
        
        options: {
          base: 'src/app'
        },
        
        src: ['<%= cfg.tpl.app %>'],
        dest: '<%= distdir %>/templates/app.js',
        module: 'templates.app' // 複製過去後會包在一個新的 module 中，這裏是給定該 module 的名稱
      },
    
      common: {
        options: {
          base: 'src/common'
        },
        src: ['<%= cfg.tpl.common %>'],
        dest: '<%= distdir %>/templates/common.js',
        module: 'templates.common'
      }
    },

    // concat 這個 task 下面定義了多組 target
    // 如果呼叫時，沒特別指名某個 target，就會全部都執行
    concat:{
      
      // 合併多個 js 並複製到 /dist 下面
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= cfg.js %>', '<%= cfg.jsTpl %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      },

      // js - vendor
      // vendor: {
      //   src:['vendor/*.js'],
      //   dest: '<%= distdir %>/vendor.js'
      // },
      
      // 複製 html
      index: {
        src: ['src/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      }

      
    },

    //
    uglify: {
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= cfg.js %>' ,'<%= cfg.jsTpl %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      },
      angular: {
        src:['<%= concat.angular.src %>'],
        dest: '<%= distdir %>/angular.js'
      },
      mongo: {
        src:['vendor/mongolab/*.js'],
        dest: '<%= distdir %>/mongolab.js'
      },
      bootstrap: {
        src:['vendor/angular-ui/bootstrap/*.js'],
        dest: '<%= distdir %>/bootstrap.js'
      },
      jquery: {
        src:['vendor/jquery/*.js'],
        dest: '<%= distdir %>/jquery.js'
      }
    },

    // watch 是在調用 grunt-watch 這個 task
    watch: {
      
      all: {
        files:['<%= cfg.js %>', '<%= cfg.specs %>', '<%= cfg.tpl.app %>', '<%= cfg.tpl.common %>', '<%= cfg.html %>'],
        tasks:['default','timestamp']
      },

      build: {
        files:['<%= cfg.js %>', '<%= cfg.specs %>', '<%= cfg.tpl.app %>', '<%= cfg.tpl.common %>', '<%= cfg.html %>'],
        tasks:['build','timestamp']
      },

      // dev 開發時只將 src/ 下面所有 js 合併成一張放到 /dist 下面，方便我用 index-debug.html 載入
      dev: {
          files: [ 'src/**/*', 'vendor/**/*' ],
          tasks: [ 'concat:dist', 'timestamp' ]
      },
    },

    // task
    // 跑 test
    karma: {
      unit: { options: karmaConfig('test/config/unit.js') },
      watch: { options: karmaConfig('test/config/unit.js', { singleRun:false, autoWatch: true}) }
    },


    //
    jshint:{
      files:['gruntFile.js', '<%= cfg.js %>', '<%= cfg.jsTpl %>', '<%= cfg.specs %>', '<%= cfg.scenarios %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    }


  });
  
  // 
  grunt.registerTask('watchdev', ['watch:dev']);

  grunt.registerTask('build', ['clean','html2js','concat','copy', 'clean:remove_sass']);
  

  // Default task.
  grunt.registerTask('default', ['jshint','build','karma:unit']);
  
  
  // grunt.registerTask('build', ['clean','html2js','concat','copy:assets']);
  
  grunt.registerTask('release', ['clean','html2js','uglify','jshint','karma:unit','concat:index', 'recess:min','copy:assets']);
  
  grunt.registerTask('test-watch', ['karma:watch']);
  
  


};
