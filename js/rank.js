(function(){  	
	//資料陣列
	var branches = []; var map; var ND = Array(8).fill(0);
	//綠色由淺到深十種等級	
	var gcolor = ['d5f6e3','abedc8','82e3ac','58da90','2dcc71','29bc69','209252','1c7d46','12542f','092a17'];
	
	function thehash(){
		return location.hash;
	}

	function changeColor(idname,colorrank) {
		// update 台灣縣市 color in data
		var area = map.getObjectById(idname);
		area.color = '#'+ gcolor[colorrank];
		area.colorReal = gcolor[colorrank];
		// make the chart take in new color
		area.validate();
		//新竹市和嘉義市連動
		if(idname == 'hsinchu'){       	
		changeColor("TW-HSQ",colorrank);
		}else if(idname == 'chiayi'){
		changeColor("TW-CYI",colorrank);
		}
	}
	
	function writeDevInfo(event) {
		document.getElementById("devInfo").innerHTML = event.str;
	}
	
	function ranking(i,n,d){
		if(i<5){
			ND[0]+=n;	ND[1]+=d;
		}else if(i<10){
			ND[2]+=n;	ND[3]+=d;
		}else if(i<14){
			ND[4]+=n;	ND[5]+=d;
		}else if(i<17){
			ND[6]+=n;	ND[7]+=d;
		}
	}
	
function per(i){
	if (i==0) {
		return 0; 
	}
	else if(i<8&i>0){
		return 5; 
	}
	else if(i<13&i>7){
		return 10; 
	}
	else if(i<18&i>12){
		return 15; 
	}
	else if(i<23&i>17){
		return 20; 
	}
	else if(i<28&i>22){
		return 25; 
	}
	else if(i<33&i>27){
		return 30; 
	}
	else if(i<38&i>32){
		return 35; 
	}
	else if(i<43&i>37){
		return 40; 
	}
	else if(i<48&i>42){
		return 45; 
	}
	else if(i<53&i>47){
		return 50; 
	}
	else if(i<58&i>52){
		return 55; 
	}
	else if(i<63&i>57){
		return 60; 
	}
	else if(i<68&i>62){
		return 65; 
	}
	else if(i<73&i>67){
		return 70; 
	}
	else if(i<78&i>72){
		return 75; 
	}
	else if(i<83&i>77){
		return 80; 
	}
	else if(i<88&i>82){
		return 85; 
	}
	else if(i<93&i>87){
		return 90; 
	}
	else if(i<100&i>92){
		return 95; 
	}
	else if(i==100){
		return 100; 
	}
}		
	function finalRank(){
		var north = Math.round(ND[0]/ND[1]*100);		
		var mid1 = Math.round(ND[2]/ND[3]*100);
		var south = Math.round(ND[4]/ND[5]*100);
		var east = Math.round(ND[6]/ND[7]*100);
		document.getElementById('northprogress').classList.add('progress-'+per(north)); 
		document.getElementById('eastprogress').classList.add('progress-'+per(east)); 
		document.getElementById('southprogress').classList.add('progress-'+per(south)); 
		document.getElementById('mid1progress').classList.add('progress-'+per(mid1)); 
		document.getElementById("east").innerHTML=east+'%';
		document.getElementById("south").innerHTML=south+'%';
		document.getElementById("mid1").innerHTML=mid1+'%';
		document.getElementById("north").innerHTML=north+'%';
	}

AmCharts.ready(function() {
	map = new AmCharts.AmMap();
	map.balloon.color = "#000000";
	
	var dataProvider = {
		mapVar: AmCharts.maps.taiwanHigh,
		getAreasFromMap:true,
	};
	map.dataProvider = dataProvider;
	map.areasSettings = {
		autoZoom: false,
		colorSolid:"#3C3C3C",
		rollOverOutlineColor:"#484891",//border 
		unlistedAreasAlpha:0,
		rollOverColor:"#FFFCEC",
		color:"#39A0ED",// map color
		selectedColor:"#3C3C3C",
		selectedOutlineColor:"#FFFF6F"
	};
	//map.smallMap = new AmCharts.SmallMap();
	map.developerMode = true;
	map.addListener("writeDevInfo", writeDevInfo);
	map.write("mapdiv");
	
	$("#mapdiv").css("background-color","#AAAAAA");
	
	
		var query = firebase.database().ref("area").orderByKey();
		query.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {   
				branches.push({
					area: childSnapshot.key,
					start: childSnapshot.val().start,
					end: childSnapshot.val().end,
					rank: 0
				});						
			});	
			branches.sort(function (a, b) {
				if (a.start > b.start) 
					return 1;
				else{
					return (a.end > b.end) ? 1 : -1;
				}
			});
			firebase.database().ref('user/' + firebase.auth().currentUser.uid).on("value",function(snap) {
				var went = snap.val().went;	 var count=0;
				console.log(went);
				for(var i = 0;i<branches.length;i++){
					var b = branches[i];
					for(var j = b.start; j <b.end; j++){
						if(went[count]){
							b.rank ++;
						}
						count++;
					}
					var num = b.end-b.start;
					var colorrank = Math.round((b.rank/num)*10);
					changeColor(b.area,colorrank);
					ranking(i,b.rank,num);
				}
				$("#mapdiv").css("background-color","#FFFFFF");
				finalRank();
			});			
		});			
});
	
firebase.auth().onAuthStateChanged(firebaseUser =>{
	var myhash = thehash().split('#');
	var Ref = firebase.database().ref('user/' + myhash[1]);
	Ref.on("value", function(snapshot) {
			document.getElementById("author").innerHTML = snapshot.val().displayName;  
			document.getElementById("authorP").src = snapshot.val().photo;
		});
	
	if(firebaseUser){		
		var uid = firebase.auth().currentUser.uid;			
		if(uid!=myhash[1]){
			document.getElementById("Ucount").classList.add("hide");
			document.getElementById("map_canvas").classList.add("hide");
			document.getElementById("wrap").classList.add("hide");
		}else{		
		
		}
	}else{
		document.getElementById("Ucount").classList.add("hide");
		document.getElementById("map_canvas").classList.add("hide");
		document.getElementById("wrap").classList.add("hide");
	}
});		
}());	