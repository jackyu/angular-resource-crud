var service = angular.module('services.phone', [
	'ngResource'
]);

service.factory('phoneService', ['$resource', function($resource){

	// Collection 內部保存已取回的資料集，外界會偵聽這個值的變化
	this.data = [];
	this.raw = {};

	var $r = $resource('/api/phone/:id', {id:'@id'}, {
		// query: { 																 // 取得 phones 列表資料
		// 	url: '/api/phones', 
		// 	method: 'GET', 
		// 	isArray: true 
		// }, 
		query: { 																 // 取得 phones 列表物件 (包含分頁資料)
			url: '/api/phones', 
			method: 'GET', 
			isArray: true,
			transformResponse: postProcessor.bind(this)
		}, 
		get: { method: 'GET' },									 // 取得 phone 物件
		save: { method: 'POST' },								 // 新增 phone 物件
		update: { method: 'PUT' },							 // 更新 phone 物件
		destroy: { method: 'DELETE' }						 // 刪除 phone 物件
	});

	// utility - post-processor 
	// http://docs.angularjs.org/api/ngResource.$resource
	function postProcessor(data, headerGetter){

		// 手動將 json str 轉成 js obj
		var d = angular.fromJson(data);

		// 自動更新內部維護的 model 物件
		this.raw = d
		this.data = d.data;

		return d.data;
	}
	
	return $r;
}]);