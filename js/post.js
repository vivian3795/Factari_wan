(function(){  
	//讀取當下factory post
	var query = firebase.database().ref("post").orderByKey();
		query.once("value")
			.then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) { 
					if(childSnapshot.val().factory == location.hash){
						var title = childSnapshot.val().title;
						var pic = childSnapshot.val().picture;
						var words = childSnapshot.val().words;
						thePost(pic,title,words,childSnapshot.key);
					}
				});
				ckLike();
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
	var picture = document.getElementById("picture");
	var up, now;
	picture.addEventListener('change',function(e) {
		up = e.target.files[0];
	});

	function nowtime() {
		var n = new Date();
		var y = n.getFullYear()-2000;//2016->16
		var m = (n.getMonth()+1< 10)?("0" + (n.getMonth() + 1)):(n.getMonth() + 1);
		var d = (n.getDate()< 10)?("0" + (n.getDate())):(n.getDate());
		var h = (n.getHours() + 8< 10)?("0" + (n.getHours() + 8)):(n.getHours() + 8);
		var mi = (n.getMinutes()< 10)?("0" + (n.getMinutes())):(n.getMinutes());
		var s = (n.getSeconds()< 10)?("0" + (n.getSeconds())):(n.getSeconds());
		now = y+"-"+m+"-"+d+"_"+h+":"+mi+":"+s;
	}

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

	//當post完成繳交
	const postWrite = document.getElementById("postWrite");
	postWrite.addEventListener('click', e =>{
		var user = firebase.auth().currentUser;		
		if (user != null) {
			nowtime(); var uid = user.uid;
			var title = document.getElementById("title").value;
			var words = document.getElementById("words").value;
			var pname = now+"&"+uid;
			var Ref = firebase.database().ref('post/'+pname);
			//照片上傳檔案庫
			var storageRef = firebase.storage().ref("post/"+pname+".jpg");
		storageRef.put(up).then(function() {
			storageRef.getDownloadURL().then(function(url) {
				Ref.set({	//寫入資料庫
					picture : url,	
					title : title,
					words: words,
					factory : location.hash //#工廠名,待補
				}).then(function(){thePost(url,title,words,pname);});
			});
		});	
		var myhash = location.hash.split('#');
		var RefF = firebase.database().ref('factory/' + myhash[1]);
		RefF.on("value", function(childSnapshot) {
			var id = childSnapshot.val().picture;
			var RefU = firebase.database().ref('user/' + uid);
			RefU.on("value",function(snapshot) {
				var a = snapshot.val().went; 
				a[id] = true;
					RefU.update({ // in database
						went: a
					});
			});	
		});						
		}else{
			 alert("please log in");
		}
	});	
	
	const cancel= document.getElementById("cancel");
	cancel.addEventListener('click', e =>{
		document.getElementById("title").value="";
		document.getElementById("words").value="";
	});		
	
	function thePost(image,title,words,key){
        var idiv = document.createElement("div");
		idiv.className = "card";
		document.getElementById("cards").appendChild(idiv);
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
		A.className = "fa fa-comment-o";
		A.href = "article.html#" + key;
		liA.appendChild(A);
		
		var liB = document.createElement("li");
		ul.appendChild(liB);
		
		var B = document.createElement("a");
		B.className = "fa fa-heart-o";
		B.id = key;
		B.addEventListener('click', e =>{ like(key); });
		liB.appendChild(B);
	}