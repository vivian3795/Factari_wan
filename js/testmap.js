 function initMap(area) {
          if(area==null){
            area = 1;
          }
          var area;
          var n,e,w,s,start,end;
          var local = "25.15,25.10,121.85,121.60,0,1\n" +
					  "25.15,25.05,121.75,121.58,1,1\n" +
					  "25.23,24.95,121.70,121.50,1,17\n" +
					  "25.00,24.55,121.65,121.10,17,35\n" +
					  "24.80,24.40,121.50,121.00,35,37\n" +
					  "24.60,24.30,121.20,120.80,37,43\n" +
					  "24.16,24.14,121.45,120.75,43,54\n" +
					  "24.00,23.80,120.80,120.20,54,62\n" +
					  "23.80,23.40,120.80,120.20,62,72\n" +
					  "23.90,23.70,121.45,120.80,72,83\n" +
					  "23.45,23.35,120.90,120.20,83,92\n" +
					  "23.30,22.85,120.70,120.20,92,114\n" +
					  "23.20,22.40,120.80,120.40,114,118\n" +
					  "22.60,22.00,120.80,120.40,118,122\n" +
					  "24.80,24.25,121.80,121.50,122,123\n" +
					  "24.10,23.10,121.60,121.20,123,125\n" +
					  "22.90,22.50,121.30,120.60,125,133\n" +
					  "23.70,23.50,119.60,119.50,133,133\n" +
					  "24.50,24.40,118.42,118.34,133,134" ;
		  var local1= local.split('\n');		  
          var nowPlace = local1[area].split(',');
             if(area==0){//keelung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
              start = nowPlace[4];
              end = nowPlace[5];
          }
          else if(area==1){//taipei
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
              start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==2){//xinbei
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
              start = nowPlace[4];
              end = nowPlace[5];				
          }
		  else if(area==3){//taoyuan
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
				      start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==4){//hsinchu
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==5){//miaoli
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==6){//taichung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==7){//changhua
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==9){//nantou
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==8){//yunlin
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==10){//chiayi
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==11){//tainan
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]); 
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==12){//kaohsiung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]); 
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==13){//pingtung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]); 
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		   else if(area==16){//yilan
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==15){//hualien
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
              start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==14){//taitung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==17){//penghu
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]); 
			        start = nowPlace[4];
              end = nowPlace[5];
          }
		  else if(area==18){//kinmen
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			        start = nowPlace[4];
              end = nowPlace[5];
          }
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {lat: 25.07, lng:121.39 }
          });
          var bounds = {
            north: n,
            south: s,
            east: e,
            west: w
          };
          // Display the area between the location southWest and northEast.
          map.fitBounds(bounds);
          // Add 5 markers to map at random locations.
          // For each of these markers, give them a title with their index, and when
          // they are clicked they should open an infowindow with text from a secret
          // message.
          var secretMessages = ['一太e衛浴觀光工廠',
                                '三峽農特產文化館',
                                '大黑松小倆口牛軋糖創意博物館',
                                '工研益壽多文化館',
                                '手信坊創意和菓子文化館',
                                '玉美人孕婦裝觀光工廠',
                                '光淙金工藝術館',
                                '宏洲磁磚觀光工廠',
                                '琉傳天下藝術館',
                                '茶山房肥皂文化體驗館',
                                '許新旺陶瓷紀念博物館',
                                '幾分甜幸福城堡',
                                '登峰魚丸博物館',
                                '維格餅家 鳳梨酥夢工場',
                                '台灣不二衛生套知識館',
                                '吳福洋襪子故事館',
                                '王鼎時間科藝體驗館',
                                '中天健康生活館',
                                '白木屋品牌探索館',
                                '巧克力共和國',
                                '東和音樂體驗館',
                                '卡司．蒂菈樂園',
                                '郭元益糕餅博物館',
                                '雅聞魅力博覽館',
                                '義美生產生態生活廠區',
                                '麗嬰房采衣館',
                                '臺灣菸酒(股)公司 桃園觀光酒廠',
                                '江記豆腐乳文化館',
                                '祥儀機器人夢工廠 未來館',
                                '老K舒眠文化館',
                                '南僑桃園觀光體驗工廠',
                                '大溪老茶廠',
                                '太平洋自行車博物館',
                                'GFun機能服飾紡織生活館',
                                '源友咖啡文化園區',
                                '春池綠能玻璃觀光工廠',
                                '濟生Beauty兩岸觀光生醫美學健康館',
                                '冠軍綠概念館',
                                '臺鹽通霄觀光園區',
                                '百茶文化園區觀光工廠',
                                '立康健康養生觀光工廠',
                                '竹南啤酒觀光工廠',
                                '四方鮮乳酪故事館',
                                '台灣氣球博物館',
                                '台灣味噌釀造文化館',
                                '張連昌薩克斯風博物館',
                                '順天堂觀光工廠',
                                '鞋寶觀光工廠',
                                '寶熊漁樂館',
                                '臺灣菸酒(股)公司台中觀光酒廠',
                                '老樹根魔法木工坊',
                                '阿聰師芋頭文化館',
                                '台灣印刷探索館',
                                '烏日啤酒觀光工廠',
                                '中興穀堡稻米博物館',
                                '台灣玻璃館',
                                '白蘭氏健康博物館',
                                '襪仔王觀光工廠',
                                '樂活觀光襪廠',
                                '緞帶王觀光工廠',
                                '台灣優格餅乾學院',
                                '華新MASK創意生活館',
                                '丸莊醬油觀光工廠',
                                '大同醬油黑金釀造館',
                                '汎歌保養品科技美學舘',
                                '朝露魚舖觀光工廠',
                                '源順芝麻觀光油廠',
                                '福祿壽觀光酒廠',
                                '緹諾時尚生活館',
                                '興隆毛巾觀光工廠',
                                '台灣鯛生態創意園區',
                                '良作工場農業文創館',
                                '水里蛇窯陶藝文化園區',
                                '台灣麻糬主題館',
                                '光遠燈籠觀光工廠',
                                '旺根城-藏傘閣觀光工廠',
                                '采棉居寢飾文化舘',
                                '香里活力豬品牌文化館',
                                '造紙龍手創館',
                                '遊山茶訪',
                                '廣興紙寮',
                                '臺灣菸酒(股)公司埔里觀光酒廠',
                                '臺灣菸酒(股)公司南投觀光酒廠',
                                '卡普秀醫美研發中心',
                                '民雄金桔觀光工廠',
                                '板陶窯交趾剪黏工藝園區',
                                '臺灣菸酒(股)有限公司嘉義觀光酒廠',
                                '余順豐花生觀光工廠',
                                '梅問屋梅子元氣館',
                                '永勝小丸子健康工廠',
                                '月桃故事館',
                                '卡羅爾銅管樂器觀光工廠',
                                'Sonispa漾魅力音波體驗館',
                                '臺南．家具產業博物館',
                                '立康中草藥產業文化館',
                                '台灣金屬創意館',
                                '和明織品文化館',
                                '港香蘭綠色健康知識館',
                                'TJCOS台鉅美妝觀光工廠',
                                '臺灣菸酒(股)公司隆田觀光酒廠',
                                '黑橋牌香腸博物館',
                                '康那香不織布創意王國',
                                '新百祿燕窩觀光工廠',
                                '麗豐微酵館',
                                '瓜瓜園地瓜生態故事館',
                                '天一。中藥生活化園區',
                                '台灣漢藥體驗學習館',
                                '臺灣菸酒公司善化啤酒觀光工廠',
                                '虹泰水凝膠世界',
                                '卡多利亞良食故事館',
                                '紅崴觀光工廠',
                                '美雅家具觀光工廠',
                                '東和蜂文化觀光工廠',
                                '華美光學eye玩視界',
                                '國王家族羽絨服飾觀光工廠',
                                '台灣滷味博物館',
                                '珍芳烏魚子見學工廠',
                                '彪琥台灣鞋故事館',
                                '富樂夢橡皮擦觀光工廠',
                                '萬寶祿酵素品牌文化館',
                                '臺灣菸酒(股)公司屏東觀光酒廠',
                                '鮮饌道海洋食品文化館',
                                '天明製藥農科觀光藥廠',
                                '池上鄉農會觀光工廠金色豐收館',
                                '香又香便當調查局',
                                '台灣菸酒(股)公司花蓮觀光酒廠',
                                '亞典蛋糕密碼館',
                                '宜蘭餅發明館',
                                '金車噶瑪蘭威士忌酒廠',
                                '博士鴨觀光工廠',
                                '菌寶貝博物館',
                                '臺灣菸酒(股)公司宜蘭酒廠觀光工廠',
                                '橘之鄉蜜餞觀光工廠',
                                '台灣足鞋健康知識館',
                                '陳金福號貢糖觀光工廠'];

          var picture = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg',
                        '10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg',
                        '20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg','26.jpg','27.jpg','28.jpg','29.jpg',
                        '30.jpg','31.jpg','32.jpg','33.jpg','34.jpg','35.jpg','36.jpg','37.jpg','38.jpg','39.jpg',
                        '40.jpg','41.jpg','42.jpg','43.jpg','44.jpg','45.jpg','46.jpg','47.jpg','48.jpg','49.jpg',
                        '50.jpg','51.jpg','52.jpg','53.jpg','54.jpg','55.jpg','56.jpg','57.jpg','58.jpg','59.jpg',
                        '60.jpg','61.jpg','62.jpg','63.jpg','64.jpg','65.jpg','66.jpg','67.jpg','68.jpg','69.jpg',
                        '70.jpg','71.jpg','72.jpg','73.jpg','74.jpg','75.jpg','76.jpg','77.jpg','78.jpg','79.jpg',
                        '80.jpg','81.jpg','82.jpg','83.jpg','84.jpg','85.jpg','86.jpg','87.jpg','88.jpg','89.jpg',
                        '90.jpg','91.jpg','92.jpg','93.jpg','94.jpg','95.jpg','96.jpg','97.jpg','98.jpg','99.jpg',
                        '100.jpg','101.jpg','102.jpg','103.jpg','104.jpg','105.jpg','106.jpg','107.jpg','108.jpg','109.jpg',
                        '110.jpg','111.jpg','112.jpg','113.jpg','114.jpg','115.jpg','116.jpg','117.jpg','118.jpg','119.jpg',
                        '120.jpg','121.jpg','122.jpg','123.jpg','124.jpg','125.jpg','126.jpg','127.jpg','128.jpg','129.jpg',
                        '130.jpg','131.jpg','132.jpg','133.jpg','134.jpg'
                        ];

          var lngSpan = bounds.east - bounds.west;
          var latSpan = bounds.north - bounds.south;
          /*
           for (var i = start; i <= end; ++i) {
                var factoryDetail = factoryList[i].split(',');
                var Flat = factoryDetail[0];
                var Flng = factoryDetail[1];...
                var marker = new google.maps.Marker({
                    position: {
                      lat: Flat,
                      lng: Flng,
                    },
                    map: map
                });
            }
          */
          for (var i = start; i < end/*secretMessages.length*/; ++i) {
            var marker = new google.maps.Marker({
              position: {
                lat: bounds.south + latSpan * Math.random(),
                lng: bounds.west + lngSpan * Math.random()
              },
              map: map
            });
            attachSecretMessage(marker, secretMessages[i],picture[i]);
          }
        }
        // Attaches an info window to a marker with the provided message. When the
        // marker is clicked, the info window will open with the secret message.
        function attachSecretMessage(marker, secretMessage,picture) {
          var infowindow = new google.maps.InfoWindow({
           content: "<IMG BORDER='0' ALIGN='Left' SRC=./images/"+picture+">"+"<div></div>"+"<a href='https://www.google.com.tw'>"+secretMessage+"</a>"
          });
          marker.addListener('mouseover', function() {
            infowindow.open(marker.get('map'), marker);
          });
        }
       
