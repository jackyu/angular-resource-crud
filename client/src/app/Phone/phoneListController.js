var phone = angular.module('controllers.phone', [
	'models.phone'
]);

phone.controller('phoneListCtrl', ['$scope', 'phoneModel', function($scope, phoneModel){
	
	console.log( 'phone model get phones:', phoneModel.getPhones() );

	$scope.phones = [
		{"title": "Apple iPhone 5S 16GB", "image": "http://attach.sogi.com.tw/img_product/360/NO_10220.jpg", "description": "蘋果推出全新 Apple iPhone 5S 智慧型手機，外觀融入薄僅 7.6 公釐、輕達 112 公克的機身之中。湛於精工的 Apple iPhone 5S 具備 4 吋（對角線）寬螢幕 Multi-Touch 觸控螢幕、1,136 x 640pixels 螢幕解析度。亮麗的鋁金屬外殼，光滑俐落的金屬與玻璃材質，藍寶石水晶安居其中的主畫面按鈕，更有藍寶石水晶保護著 iSight 攝錄鏡頭。此等境界的設計與架構著實無人能出其右。最終造就出 Apple iPhone 5S 纖薄輕巧得難以置信的外觀與手感，且它身具金、銀及太空灰三款優雅的本色。全新指紋身分識別感應器 Touch ID，將你的手指放在主畫面按鈕上，就這樣，便能解鎖你的 Apple iPhone 5S。以這種方式取用你的手機真是既方便又極安全。你的指紋還可核准在 iTunes Store、App Store 或 iBooks Store 購買或下載的項目，再也不用輸入密碼。Touch ID 可 360 度全方位讀取，也就是說，無論置於直向、橫向，或是其他各種方向，你的 Apple iPhone 5S 都能讀取你的指紋並且認得你是誰。且由於 Touch ID 可讓你加入多個指紋，所以它也可辨認你所信任的人。"},
		{"title": "Sony Xperia Z1 C6902", "image": "http://attach.sogi.com.tw/img_product/150/NO_10104.jpg", "description": "索尼推出超級強悍的高階旗艦機種 Sony Xperia Z1 C6902，外觀配備耐用強化玻璃與堅固一體成形鋁合金外框造型，延續 OminiBalance 全平衡設計，結合了 Xperia Z 與 Xperia Z Ultra 的元素，在造型上顯得相當吸睛；而握感上部份也相當不賴，在單手持握的時候，能輕鬆地按壓電源鍵 / 按鍵鎖，螢幕下方的觸控鍵也不會難以觸碰，而實體快門鍵的配置，更讓拍攝得心應手。擁有 5 吋觸控螢幕、1,920 x 1,080pixels 螢幕解析度，螢幕是 Sony 傲視群雄的 TRILUMINOS Display for mobile 原色顯示技術，讓您體驗最真實、鮮明的影像視覺。而 X-Reality for Mobile 極真影像技術則會分析每個影像，針對畫素、色彩、對比進行自動優化及降低雜訊，提供使用者最清晰銳利、細膩逼真、純淨自然的流暢影像。共有攝魂黑、煥影白、夢鏡紫三色讓大家選擇。"}
	];

}]);