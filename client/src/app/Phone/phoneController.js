var phone = angular.module('controllers.phone', [
	'models.phone'
]);

// 列表頁
phone.controller('phoneListCtrl', ['$scope', '$location', 'phoneModel', function($scope, $location, phoneModel){
	
	$scope.phones = phoneModel.getAll();

	// 點擊詳細頁連結
	$scope.detail = function (phone) {
		$location.path( "/phone/" + phone.id );
	};

	// 點擊新增操作
	$scope.add = function () {
		console.log( 'phone list controller add phone' );
		// $location.path( "/phone/new" );
		
		var phone = {};
		phone.title = "HTC One 4G LTE 32GB";
		phone.image = "http://sogi-image.sogi.com.tw/www/Product/10523/main_image/big/HTC_One_4G_LTE_32GB20131227162022uid967.jpg";
		phone.description = "宏達電推出高階旗艦機皇新 HTC One 4G LTE，除了擁有 4.7 吋、1,920 × 1,080pixels 的 1080P Full HD Super LCD 3 觸控螢幕，像素解析度達 468ppi 之外，還使用了一體成形全金屬機身，零縫隙、前置雙喇叭設計，讓機身線條很俐落，完全顯現出突破性工藝以及流行的魅力質感。機身上的電源按鍵同時也有一組紅外線發射器，可配合 Sense TV 功能內建資料庫，直接透過選擇品牌將新 HTC One 4G LTE 變成電視遙控器，而本身也能藉由自訂學習模擬成可對應機上盒、音響周邊的紅外線遙控器。而與數位電視互動除了可作為遙控器使用，新 HTC One 4G LTE 也能配合數位電視下載電視頻道節目，使用者即可直接在手機上整理準備觀賞的電視節目，並且在撥出時間發出通知，或者瀏覽更多的相關節目資訊。在聲音部分，除了透過上下兩組擴音喇叭配合 BeatsAudio 音效進行輸出外，此次新 HTC One 4G LTE 將整個聲音技術稱為「HTC BoomSound」體驗，其中也包含整合 HDR 高敏度麥克風加強收音，同時在通話過程內也透過「Sense Voice」技術強化通話品質。";
	
		phoneModel.save( phone, function(phone){
			if( !$scope.phones && $scope.phones.length == 0 ) {
				$scope.phones = [];
			}
			$scope.phones.push( phone );
		});		

	};

	// 點擊刪除操作
	$scope.remove = function (phone) {
		if( confirm('確定刪除這筆資料') ) {
			// 先找出對應的索引位置
			var index = $.inArray( phone, $scope.phones );
			phoneModel.remove( phone.id , function(data){
				$scope.phones.splice( index, 1 );	
			});
		}
	};

}]);

// 詳細頁
phone.controller('phoneDetailCtrl', ['$scope', '$location', '$route', 'phoneModel', function($scope, $location, $route, phoneModel){

	$scope.phone = phoneModel.getById( $route.current.params.id );

	// 點擊返回列表頁
	$scope.back = function (){
		$location.path( "/phones" );
	}
}]);


// 編輯頁
phone.controller('phoneEditCtrl', ['$scope', '$location', '$route', 'phoneModel', function($scope, $location, $route, phoneModel){

	$scope.phone = phoneModel.getById( $route.current.params.id );

	// 點擊返回列表頁
	$scope.back = function (){
		$location.path( "/phones" );
	}
}]);