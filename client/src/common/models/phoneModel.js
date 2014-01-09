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
		getById: function(id) {
			return phoneService.get({id: id});
		},

		// 儲存資料
		save: function(phone, sb, eb) {

			if( !sb ) sb = angular.noop();
			if( !eb ) eb = angular.noop();

			return phoneService.save({}, phone, sb, eb);
		},

		// 刪除指定 id 的資料
		remove: function(id, sb, eb) {

			if( !sb ) sb = angular.noop();
			if( !eb ) eb = angular.noop();

			return phoneService.destroy({id: id}, sb, eb);
		}

	};

	return phone;
}]);