var express = require("express"),
  app     = express(),
  config  = require('./config.js'),
  port    = parseInt(process.env.PORT, 10) || config.server.listener;

// 路由設定

require('./routes/static.js').addRoutes(app, config);
require('./routes/api.js').addRoutes(app, config);
require('./routes/app.js').addRoutes(app, config);

// 組態設定

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.static(__dirname));
  app.use(app.router);
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');
