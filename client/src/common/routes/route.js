var app = angular.module('app.route', [
	'ngRoute'
]);

// 路由設定
app.config([
	'$routeProvider', 
	'$locationProvider', 

function($routeProvider, $locationProvider){

	$locationProvider.html5Mode(false);

	$routeProvider

		// 列表頁
		.when('/phones', {
			templateUrl: 'static/app/phone/templates/list.tpl.html', 
			controller: 'phoneListCtrl'
		})

		// 新增頁
		.when('/phone/new', {
			templateUrl: 'static/app/phone/templates/detail.tpl.html',
			controller: 'phoneNewCtrl'
		})

		// 編輯頁
		.when('/phone/:id/edit', {
			templateUrl: 'static/app/phone/templates/detail.tpl.html',
			controller: 'phoneEditCtrl'
		})

		// 詳細頁
		.when('/phone/:id', {
			templateUrl: 'static/app/phone/templates/detail.tpl.html',
			controller: 'phoneDetailCtrl'
		})

		// 不屬於指定路徑的處理
		.otherwise({
			redirectTo: '/phones'
		});

}]);