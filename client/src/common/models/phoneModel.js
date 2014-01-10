var model = angular.module('models.phone', [
	'services.phone'
]);

model.factory('phoneModel', ['phoneService', function(phoneService){

	var phone = {

		// 取得所有 phone 資料
		getAll: function() {
			return phoneService.query();
		},

		// 利用 id 取得單一資料
		getById: function(id, sb, eb) {
			return phoneService.get({id: id}, sb, eb);
		},

		// 儲存資料
		save: function(phone, sb, eb) {

			if( !sb ) sb = angular.noop();
			if( !eb ) eb = angular.noop();

			return phoneService.save(phone, sb, eb);
		},

		// 更新資料
		update: function(phone, sb, eb) {

			if( !sb ) sb = angular.noop();
			if( !eb ) eb = angular.noop();

			return phone.$update(sb, eb);
		},

		// 刪除指定 id 的資料
		remove: function(phone, sb, eb) {

			if( !sb ) sb = angular.noop();
			if( !eb ) eb = angular.noop();

			return phone.$destroy(sb, eb);
		}

	};

	return phone;
}]);