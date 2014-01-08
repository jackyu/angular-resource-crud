var express = require("express"),
  app     = express(),
  port    = parseInt(process.env.PORT, 10) || 8080;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname));
  app.use(app.router);
});

// var recipes_map = {
//   '1': {
//     "id": "1",
//     "title": "Cookies",
//     "description": "Delicious, crisp on the outside, chewy on the outside, oozing with chocolatey goodness cookies. The best kind",
//     "ingredients": [
//       {
//         "amount": "1",
//         "amountUnits": "packet",
//         "ingredientName": "Chips Ahoy"
//       }
//     ],
//     "instructions": "1. Go buy a packet of Chips Ahoy\n2. Heat it up in an oven\n3. Enjoy warm cookies\n4. Learn how to bake cookies from somewhere else"
//   },
//   '2': {
//     id: 2,
//     'title': 'Recipe 2',
//     'description': 'Description 2',
//     'instructions': 'Instruction 2',
//     ingredients: [
//       {amount: 13, amountUnits: 'pounds', ingredientName: 'Awesomeness'}
//     ]
//   }
// };
// var next_id = 3;

// // 取回全部資料, client 端用 $resource.query() 操作
// app.get('/recipes/search', function(req, res) {
  
//   console.log( 'query all', req.query );

//   var recipes = [];

//   for (var key in recipes_map) {
//     recipes.push(recipes_map[key]);
//   }

//   // Simulate delay in server
//   setTimeout(function() {
    
//     // res.send(recipes);

//     // 故意改成返還 Obj, 好夾帶其它參數，例如分頁資訊
//     // stat: ok|fail
//     res.send( {stat:'ok', records: 129, page: 1, totalPages:12, pack:recipes} );

//   }, 500);
// });

// // 取一筆資料
// app.get('/recipes/:id', function(req, res) {
  
//   console.log('取單筆: ', req.params.id, req.query );
  
//   res.send(recipes_map[req.params.id]);
// });

// // 新增 1 or n 筆
// app.post('/recipes', function(req, res) {
  
//   console.log('新增單筆: ', req.params.id, req.query, req.body );

//   if( req.body.pack.length > 1 )
//     console.log( '\t是多筆資料' );
  
//   var recipe = {};
//   recipe.id = next_id++;  //因此 id 是由流水號生成
//   recipe.title = req.body.title;
//   recipe.description = req.body.description;
//   recipe.ingredients = req.body.ingredients;
//   recipe.instructions = req.body.instructions;

//   recipes_map[recipe.id] = recipe;

//   // 通常新增完資料，是重新撈一次全部資料返還
//   // res.send(recipe);
//   res.send({stat: 'ok', pack:[recipe]});
// });

// // 更新一筆資料 by id
// app.post('/recipes/:id', function(req, res) {
  
//   // req.body 會拿到傳來的整包 recipe obj
//   console.log('更新單筆: ', req.params.id, req.query, req.body );
  
//   var recipe = {};
//   recipe.id = req.params.id;
//   recipe.title = req.body.title;
//   recipe.description = req.body.description;
//   recipe.ingredients = req.body.ingredients;
//   recipe.instructions = req.body.instructions;

//   recipes_map[recipe.id] = recipe;

//   res.send(recipe);
// });

// // delete 一筆資料
// app.post('/recipes/:id/deleteitem', function(req, res){
  
//   console.log('刪除單筆: ', req.params.id, req.query, req.body );

//   delete recipes_map[recipe.id];

//   res.send({stat:'ok', pack: req.body});
// });



app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');
