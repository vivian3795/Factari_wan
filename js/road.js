jQuery(document).ready(function () {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  var oldDirections = [];
  var currentDirections = null;

  function initialize2(pFrom,pEnd) {
    directionsDisplay = new google.maps.DirectionsRenderer({
        'map': map,
        'preserveViewport': true,
        'draggable': true
    });	
	
    directionsDisplay.setPanel(document.getElementById("directions_panel"));

    google.maps.event.addListener(directionsDisplay, 'directions_changed',
      function() {
        if (currentDirections) {
          oldDirections.push(currentDirections);          
        }
        currentDirections = directionsDisplay.getDirections();
      });    
	
    calcRoute2(pFrom,pEnd);	
  }
  
  function calcRoute2(pFrom,pEnd) {    
	var start = pFrom;
	var end = pEnd;
    var request = {
        origin:start,		//起始地
        destination:end,	//目的地
        travelMode: google.maps.DirectionsTravelMode.DRIVING //旅行工具 WALKING | DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);		
      }
    });
		
  }
	
 function attachSecretMessage(marker, secretMessage, picture, tel, addr) {
   var infowindowHtml="<p><p><b>"+secretMessage+"</b><div><IMG BORDER='0' ALIGN='Left' SRC=./images/"+
        picture+".jpg>"+"</div><p><b>地址:"+addr+"<p>電話:"+tel+"</b>";
   var infowindow = new google.maps.InfoWindow({
    content: infowindowHtml
   });
   marker.addListener('mouseover', function() {
     infowindow.open(marker.get('map'), marker);
   }); 

    infowindow.open(marker.get('map'), marker);
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
  
		var name,tel,addr,picture,latlng;
		var myhash = location.hash.split('#');
		var Ref = firebase.database().ref('factory/' + myhash[1]);
		Ref.on("value", function(childSnapshot) {
			name = childSnapshot.val().name;
			tel= childSnapshot.key;
			addr= childSnapshot.val().addr;
			picture= childSnapshot.val().picture;
			latlng= new google.maps.LatLng(parseFloat(childSnapshot.val().lat),parseFloat(childSnapshot.val().lng));
			
			if (navigator && navigator.geolocation) {
              //getCurrentPosition屬非同步執行，要另定函數解析結果
            navigator.geolocation.getCurrentPosition(function(pos){
						//標示點陣列
				var markers = [];
				//由pos.coords取出latitude及longitude
				var curLatLng = new google.maps.LatLng(
						pos.coords.latitude, pos.coords.longitude);					
				//設定地圖參數
				var mapOptions = {
					center: curLatLng,
					mapTypeId: google.maps.MapTypeId.ROADMAP //正常2D道路模式
				};
				//在指定DOM元素中嵌入地圖
				map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
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
				bounds.extend(latlng);
				var marker = new google.maps.Marker({
					position: latlng,
					title: name, //名稱告示牌作為圖示
					icon: createMarkerIcon(name,
							{ bgColor:  'red' }),
					map: map
				});
				attachSecretMessage(marker, name, picture, tel, addr);
				
				//調整檢視範圍
				map.fitBounds(bounds);				
				initialize2(curLatLng,latlng);
				document.getElementById("theTitle").innerHTML= name;
				document.getElementById("theTitlein").innerHTML= name;
			});
			}
		});
});
  