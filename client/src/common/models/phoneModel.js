var model = angular.module('models.phone', [
	'services.phone'
]);

model.factory('phoneModel', ['phoneService', function(phoneService){

	var phone = {

		getPhones: function() {
			return phoneService.query();
		}
	}

	return phone;
}]);