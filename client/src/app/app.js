var app = angular.module('app', [
	'app.route',
	'controllers.phone'
]);

app.controller('appCtrl', ['$scope', function ($scope){
	console.log( 'App Controller!!' );
}]);