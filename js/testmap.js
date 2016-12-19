 function initMap(area) {
          if(area==null){
            area = 1;
          }
          var area;
          var n,e,w,s,start,end;
          var local = "25.15,25.10,121.85,121.60\n" +
					  "25.15,25.05,121.75,121.58\n" +
					  "25.23,24.95,121.70,121.50\n" +
					  "25.00,24.55,121.65,121.10\n" +
					  "24.80,24.40,121.50,121.00\n" +
					  "24.60,24.30,121.20,120.80\n" +
					  "24.16,24.14,121.45,120.75\n" +
					  "24.00,23.80,120.80,120.20\n" +
					  "23.80,23.40,120.80,120.20\n" +
					  "23.90,23.70,121.45,120.80\n" +
					  "23.45,23.35,120.90,120.20\n" +
					  "23.30,22.85,120.70,120.20\n" +
					  "23.20,22.40,120.80,120.40\n" +
					  "22.60,22.00,120.80,120.40\n" +
					  "24.80,24.25,121.80,121.50\n" +
					  "24.10,23.10,121.60,121.20\n" +
					  "22.90,22.50,121.30,120.60\n" +
					  "23.70,23.50,119.60,119.50\n" +
					  "24.50,24.40,118.42,118.34" ;
		  var local1= local.split('\n');		  
          var nowPlace = local1[area].split(',');
             if(area==0){//keelung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
				
          }
          else if(area==1){//taipei
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);

          }
		  else if(area==2){//xinbei
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
				
          }
		  else if(area==3){//taoyuan
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
				
          }
		  else if(area==4){//hsinchu
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
          }
		  else if(area==5){//miaoli
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			
          }
		  else if(area==6){//taichung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
          }
		  else if(area==7){//changhua
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
          }
		  else if(area==9){//nantou
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
          }
		  else if(area==8){//yunlin
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
          }
		  else if(area==10){//chiayi
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
          }
		  else if(area==11){//tainan
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]); 
			  
          }
		  else if(area==12){//kaohsiung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]); 
			  
          }
		  else if(area==13){//pingtung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]); 
			  
          }
		   else if(area==16){//yilan
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
          }
		  else if(area==15){//hualien
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);

          }
		  else if(area==14){//taitung
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
          }
		  else if(area==17){//penghu
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]); 
			  
          }
		  else if(area==18){//kinmen
              n = parseFloat(nowPlace[0]);
              s = parseFloat(nowPlace[1]);
              e = parseFloat(nowPlace[2]);
              w = parseFloat(nowPlace[3]);
			  
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
          var secretMessages = ['This', 'is', 'the', 'secret', 'message'];
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
          for (var i = 0; i < secretMessages.length; ++i) {
            var marker = new google.maps.Marker({
              position: {
                lat: bounds.south + latSpan * Math.random(),
                lng: bounds.west + lngSpan * Math.random()
              },
              map: map
            });
            attachSecretMessage(marker, secretMessages[i]);
          }
        }
        // Attaches an info window to a marker with the provided message. When the
        // marker is clicked, the info window will open with the secret message.
        function attachSecretMessage(marker, secretMessage) {
          var infowindow = new google.maps.InfoWindow({
            content:"<a href="+secretMessage+".html>123</a>"
          });
          marker.addListener('mouseover', function() {
            infowindow.open(marker.get('map'), marker);
          });
        }
       