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
		.when('/', {
			templateUrl: 'static/app/phone/templates/list.tpl.html', 
			controller: 'phoneCtrl'
		})

		.otherwise({
			redirectTo: '/'
		});

}]);