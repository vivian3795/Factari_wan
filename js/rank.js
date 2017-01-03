(function(){  	
	//資料陣列
	var branches = []; var map; var ND = Array(8).fill(0);
	var gcolor = ['b9fcac','a6e89a','92d588','7b807a','6baf63','51954c','3d8138','286d26','252a25','014601'];
	
	function thehash(){		
		return location.href.split(location.pathname+"?");
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
		}else if(idname == 'xinbei'){
		changeColor("taipei",colorrank);
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
	
	$("#mapdiv").css("background-color","#FFFFFF");
	
	
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
				if ( parseInt(a.start) >  parseInt(b.start) )
					return 1;
				else{
					return ( parseInt(a.end) >  parseInt(b.end)) ? 1 : -1;
				}
			});
			firebase.database().ref('user/' + firebase.auth().currentUser.uid).on("value",function(snap) {
				var went = snap.val().went;	 var count=0;
				for(var i = 0;i<branches.length;i++){
					var b = branches[i];
					for(var j = b.start; j <b.end; j++){
						if(went[count]!=0){
							b.rank ++;
						}
						count++;
					}
					var num = b.end-b.start;
					var colorrank = Math.round((b.rank/num)*10);
					if (num==0)
						colorrank=0;
					if (colorrank==10)
						colorrank=9;
					changeColor(b.area,colorrank);
					ranking(i,b.rank,num);
				}
				$("#mapdiv").css("background-color","#c2ebed");
				finalRank();
				console.log(Math.round((1/1)*10));
			});			
		});			
});
		
firebase.auth().onAuthStateChanged(firebaseUser =>{
	var myhash = thehash();
	console.log(myhash);
	var Ref = firebase.database().ref('user/' + myhash[1]);
	Ref.once("value").then(function(snap) {
		document.getElementById("author").innerHTML = snap.val().displayName;  
		document.getElementById("authorP").src = snap.val().photo;

		var likelist = snap.val().like.split(',');		
		var queryL = firebase.database().ref("post").orderByKey();
		queryL.once("value")
			.then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) { 
					var str = childSnapshot.key;
					var bool = false;
					for(i=0;i<likelist.length-1;i++){
						if(str.indexOf(likelist[i]) !== -1){
							bool = true; break;
						}
					} 
					if(bool){
						var title = childSnapshot.val().title;
						var pic = childSnapshot.val().picture;
						var words = childSnapshot.val().words;
						thePost(pic,title,words,childSnapshot.key,"plike");
					}
					if(str.indexOf(myhash[1]) !== -1){
						var title = childSnapshot.val().title;
						var pic = childSnapshot.val().picture;
						var words = childSnapshot.val().words;
						thePost(pic,title,words,childSnapshot.key,"pwrite");
					}
				});
				ckLike();
			});
	});
	
	if(firebaseUser){		
		var uid = firebase.auth().currentUser.uid;			
		if(uid!=myhash[1]){
			document.getElementById("Ucount").classList.add("hide");
			document.getElementById("map_canvas").classList.add("hide");
			document.getElementById("plike").classList.add("hide");
		}else{
			document.getElementById("pwrite").classList.add("hide");
			document.getElementById("plike").classList.add("hide");
			document.getElementById("sidebar").classList.add("hide");
		}
	}else{
		document.getElementById("Ucount").classList.add("hide");
		document.getElementById("map_canvas").classList.add("hide");
		document.getElementById("plike").classList.add("hide");
	}
});
	
	function ckLike(){
	var user = firebase.auth().currentUser;		
	  if (user != null) {
		var path = firebase.database().ref("user/"+user.uid);
		path.on('value', snap =>{
			var likelist = snap.val().like;
			if(likelist!="none"){
				var part = likelist.split(",");
				for(var i=0;i<part.length-1;i++){
					if(document.getElementById(part[i])){
						document.getElementById(part[i]).classList.add("fa-heart");
						document.getElementById(part[i]).classList.remove("fa-heart-o");
					}
				}				
			}
		});
	  }
	}		
}());	


//onclick=like(this.id);
	function like(post){
	  var user = firebase.auth().currentUser;		
	  if (user != null) {
		var nowPost = document.getElementById(post);
		var path = firebase.database().ref("user/"+ user.uid);
		path.once('value').then(function(snap) {		
			var likelist = snap.val().like;
			var lst = snap.val().displayName;
			console.log(likelist);
			console.log(lst);
			if(nowPost.classList.contains('fa-heart')){
				nowPost.classList.remove("fa-heart");
				nowPost.classList.add("fa-heart-o");
				var part = likelist.split(post+",");
				if(part[0]==null && part[1]==null){
					path.update({ // in database
						like : "none"					
					});
				}else{
					path.update({ // in database
						like : part[0]+part[1]			
					});
				}				
			}
			else{
				nowPost.classList.add("fa-heart");
				nowPost.classList.remove("fa-heart-o");				
				if(likelist=="none"){
					path.update({ // in database
						like : post+","					
					})
					console.log( post+",");
				}else{
					path.update({ // in database
						like : post+","	+likelist				
					});
					console.log(post+","+likelist);
				}
			}
		});
	  }else{
		  alert("not login");
	  }	  
	}	

	
	function thePost(image,title,words,key,place){
        var idiv = document.createElement("div");
		idiv.className = "card"; 
		document.getElementById(place).appendChild(idiv);
	//img
		var img = document.createElement("img");
		img.className = "card-image";
		img.src = image;
		idiv.appendChild(img);
	//info	
		var info = document.createElement("div");
		info.className = "card-info";
		idiv.appendChild(info);
		
		var tit = document.createElement("div");
		tit.className = "card-title";
		tit.innerHTML = title;
		info.appendChild(tit);
		
		var detail = document.createElement("div");
		detail.className = "card-detail";
		detail.innerHTML= words;
		info.appendChild(detail);
	//socail
		var social = document.createElement("div");
		social.className = "card-social";
		idiv.appendChild(social);
		
		var ul = document.createElement("ul");
		social.appendChild(ul);
		
		var liA = document.createElement("li");
		ul.appendChild(liA);
		
		var A = document.createElement("a");
		A.className = "fa fa-comment-o WG";
		A.href = "article.html#" + key;
		liA.appendChild(A);
		
		var liB = document.createElement("li");
		ul.appendChild(liB);
		
		var B = document.createElement("a");
		if(place=="plike")
			B.className = "fa fa-heart WG";
		else
			B.className = "fa fa-heart-o WG";
		B.id = key;
		B.addEventListener('click', e =>{ like(key); });
		liB.appendChild(B);
	}