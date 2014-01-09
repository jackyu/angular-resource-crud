var app = angular.module('app.route', [
	'ngRoute'
]);

// 路由設定
app.config([
	'$routeProvider', 
	'$locationProvider', 

function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/phones', {
			templateUrl: 'static/app/phone/templates/list.tpl.html', 
			controller: 'phoneListCtrl'
		})

		.when('/phone/:id', {
			templateUrl: 'static/app/phone/templates/detail.tpl.html',
			controller: 'phoneDetailCtrl'
		})

		.otherwise({
			redirectTo: '/phones'
		});

}]);