var service = angular.module('services.phone', [
	'ngResource'
]);


service.factory('phoneService', ['$resource', function($resource){
	return $resource('/api/phone/:id', {id:'@id'}, {
		query: { method: 'GET', isArray: true }, // 取得 phones 列表資料
		get: { method: 'GET' },									 // 取得 phone 物件
		save: { method: 'POST' },								 // 新增 phone 物件
		update: { method: 'PUT' },							 // 更新 phone 物件
		destroy: { method: 'DELETE' }						 // 刪除 phone 物件
	});
}]);