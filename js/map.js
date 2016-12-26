jQuery(document).ready(function () {	
 function attachSecretMessage(marker, secretMessage, picture, tel) {
   var infowindowHtml="<IMG BORDER='0' ALIGN='Left' SRC=./images/"+picture+".jpg>"+"<div></div>"+
        "<a href='https://factory-ddb70.firebaseapp.com/info.html#"+tel+"'>"+secretMessage+"</a>"
   var infowindow = new google.maps.InfoWindow({
    content: infowindowHtml
   });
   marker.addListener('mouseover', function() {
     infowindow.open(marker.get('map'), marker);
   }); 
 }

       //利用canvas產生一個內含文字的圖檔
        function createMarkerIcon(text, opt) {
            //定義預設參數
            var defaultOptions = {
                fontStyle: "normal", //normal, bold, italic
                fontName: "Microsoft JhengHei",
                fontSize: 12, //以Pixel為單位
                bgColor: "darkblue",
                fgColor: "white",
                padding: 4,
                arrowHeight: 6 //下方尖角高度
            };
            options = $.extend(defaultOptions, opt);
            //建立Canvas，開始幹活兒
            var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d");
            //評估文字尺寸
            var font = options.fontStyle + " " + options.fontSize + "px " + 
                       options.fontName;
            context.font = font;
            var metrics = context.measureText(text);
            //文字大小加上padding作為外部尺寸
            var w = metrics.width + options.padding * 2;
            //高度以Font的大小為準
            var h = options.fontSize + options.padding * 3 +
                    options.arrowHeight;
            canvas.width = w;
            canvas.height = h;
            //邊框及背景
            context.beginPath();
            context.rect(0, 0, w, h - options.arrowHeight);
            context.fillStyle = options.bgColor;
            context.fill();
            //畫出下方尖角
            context.beginPath();
            var x = w / 2, y = h, arwSz = options.arrowHeight;
            context.moveTo(x, y);
            context.lineTo(x - arwSz, y - arwSz);
            context.lineTo(x + arwSz, y - arwSz);
            context.lineTo(x, y);
            context.fill();
            //印出文字
            context.textAlign = "center";
            context.fillStyle = options.fgColor;
            context.font = font;
            context.fillText(text,
                w / 2,
                (h - options.arrowHeight) / 2 + options.padding*1.5);
            //傳回DataURI字串
            return canvas.toDataURL();
        }

        //計算兩個經緯座標間的距離(Haversine公式)
        function distHaversine(p1, p2) {
            var rad = function (x) { return x * Math.PI / 180; }
            var R = 6371; // earth's mean radius in km
            var dLat = rad(p2.lat() - p1.lat());
            var dLong = rad(p2.lng() - p1.lng());
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat()))
                    * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return parseFloat(d.toFixed(3));
        }
        //資料陣列
        var branches = [];
		
		var query = firebase.database().ref("factory").orderByKey();
		query.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {   
				branches.push({
					name: childSnapshot.val().name,
					tel: childSnapshot.key,
					addr: childSnapshot.val().addr,
					picture: childSnapshot.val().picture,
					latlng: new google.maps.LatLng(parseFloat(childSnapshot.val().lat),parseFloat(childSnapshot.val().lng)),
					dist: 0
				});						
			});
			if (navigator && navigator.geolocation) {
                //getCurrentPosition屬非同步執行，要另定函數解析結果
                navigator.geolocation.getCurrentPosition(function(pos){
							//標示點陣列
					var markers = [];
					//由pos.coords取出latitude及longitude
					var curLatLng = new google.maps.LatLng(
							pos.coords.latitude, pos.coords.longitude);
					//分別計算對所有Branch的距離
					for (var i = 0; i < branches.length; i++) {
						var branch = branches[i];
						branch.distance = //計算兩個LatLng間的距離
								distHaversine(branch.latlng, curLatLng);
					}
					//依距離進行排序
					branches.sort(function (a, b) {
						if (a.distance == b.distance) return 0;
						return (a.distance > b.distance) ? 1 : -1;
					});
					//設定地圖參數
					var mapOptions = {
						center: curLatLng,
						mapTypeId: google.maps.MapTypeId.ROADMAP //正常2D道路模式
					};
					//在指定DOM元素中嵌入地圖
					var map = new google.maps.Map(
							document.getElementById("map_canvas"), mapOptions);
					//使用LatLngBounds統計檢視範圍
					var bounds = new google.maps.LatLngBounds();
					//加入使用者所在位置
					var marker = new google.maps.Marker({
						position: curLatLng,
						title: "現在位置",
						//借用前篇文章介紹的Canvas.toDataURL()產生動態圖檔作為圖示
						icon: createMarkerIcon("現在位置"),
						map: map
					});
					bounds.extend(curLatLng);
					//因為已排序過，故會依距離由近到遠加入Marker
					for (var i = 0; i < branches.length; i++) {
						var b = branches[i];
						//距離最近的前三名加入檢視範圍
						if (i < 3) bounds.extend(b.latlng);
						var marker = new google.maps.Marker({
							position: b.latlng,
							title: b.name, //名稱告示牌作為圖示
							icon: createMarkerIcon(b.name,
									//距離較近的前三名為紅底，其餘為綠底
									{ bgColor: i < 3 ? 'red' : 'green' }),
							map: map
						});
						attachSecretMessage(marker, b.name, b.picture, b.tel);
					}
					//調整檢視範圍
					map.fitBounds(bounds);
				});
            }
		});
    });