var app = angular.module('app', [
	'app.route',
	'controllers.phone'
]);

app.controller('appCtrl', ['$scope', '$location', function ($scope, $location){
	console.log( 'App Controller!!' );

	// 回到首頁
	$scope.root = function (){
		$scope.phones();
	}

	// Phone 列表頁面
	$scope.phones = function (){
		$location.path = '/phones';
	}
}]);