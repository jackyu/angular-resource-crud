angular.module('directives.phone', [])

.directive('editable', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var template
				, elmt;

			var show = scope.$eval(attrs.ngShow);

			element.bind('click', function(){

				elmt = $('.edit-area'); 

				// 表示點擊了編輯
				// 將對應的顯示欄位換成輸入框
				if( show ) {
					template = angular.element('<input type="text" class="form-control" ng-model="phone.title"><br/><p><textarea class="form-control" rows="8" ng-model="phone.description" cols="100"></textarea></p>');

				// 點擊了取消或存檔
				} else {
					template = angular.element('<h4>{{phone.title}}</h4><br/><p>{{phone.description}}</p>');

					// 儲存資料，呼叫 controller 的 save 方法
					if( attrs.class.indexOf('save') > 0 ) {
						scope.save();
					// 取消，將資料還原至原始狀態
					} else {
		        scope.phone = angular.copy(scope.old_phone);
					}
				}

				scope.isShow = !(scope.isShow);

				$(elmt).html( $compile(template)(scope) );

				// 呼叫 $apply 檢查 model 內的值並重新 binding
				scope.$apply();
			})
		}
	};
}]);