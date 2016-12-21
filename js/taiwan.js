 function initMap(area) {  
	if(area==null){
        console.log("Map Load");
    }
	else{
	firebase.database().ref('/area/'+area).once('value').then(function(snap) {
		var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10
        });
		if(area=="taipei" || area=="penghu"){	
			var bounds = {
				north: parseFloat(snap.val().n),
				south: parseFloat(snap.val().s),
				east: parseFloat(snap.val().e),
				west: parseFloat(snap.val().w)
			};
			map.fitBounds(bounds);
		}
		else{		
			var bounds = new google.maps.LatLngBounds(); 			
			var query = firebase.database().ref("factory").orderByKey();
			query.once("value")
			.then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) {   
					if(childSnapshot.val().area == area){
						var curLatLng = new google.maps.LatLng(parseFloat(childSnapshot.val().lat),parseFloat(childSnapshot.val().lng));
						bounds.extend(curLatLng);map.fitBounds(bounds);
						var marker = new google.maps.Marker({
							position: {
								lat: parseFloat(childSnapshot.val().lat),
								lng: parseFloat(childSnapshot.val().lng)
							},
							map: map
						});
						attachSecretMessage(marker, childSnapshot.val().name, childSnapshot.val().picture, childSnapshot.key);
					}
				});
			});
		}
	});
	}
 }
 
 function attachSecretMessage(marker, secretMessage, picture, tel) {
   var infowindow = new google.maps.InfoWindow({
    content: "<IMG BORDER='0' ALIGN='Left' SRC=./images/"+picture+">"+"<div></div>"+"<a href='https://factory-ddb70.firebaseapp.com/info.html#"+tel+"'>"+secretMessage+"</a>"
   });
   marker.addListener('mouseover', function() {
     infowindow.open(marker.get('map'), marker);
   });
 }