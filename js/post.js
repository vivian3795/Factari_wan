(function(){ 
  
  var config = {
    apiKey: "AIzaSyC6S1EiWCP6lk1lGLTgFxxuylGXPfT23y8",
    authDomain: "factory-ddb70.firebaseapp.com",
    databaseURL: "https://factory-ddb70.firebaseio.com",
    storageBucket: "factory-ddb70.appspot.com",
    messagingSenderId: "795740952180"
  };
  firebase.initializeApp(config); 	
 
	var picture = document.getElementById("picture");
	var up, now;
	picture.addEventListener('change',function(e) {
	//get file
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
	//當post完成繳交
	const postWrite = document.getElementById("postWrite");
	postWrite.addEventListener('click', e =>{
		var user = firebase.auth().currentUser;		
		if (user != null) {
			nowtime(); var uid = user.uid;
			var title = document.getElementById("title").value;
			var words = document.getElementById("words").value;
			var Ref = firebase.database().ref('post/'+now+","+uid);
			//照片上傳檔案庫
			var storageRef = firebase.storage().ref("post/"+now+","+uid+".jpg");
			storageRef.put(up);
			storageRef.getDownloadURL().then(function(url) {
				Ref.set({	//寫入資料庫
					picture : url,	
					uid : uid,	
					title : title,
					words: words,
					factory : location.hash //#工廠名,待補
				});
			});				
		}else{
			 alert("please log in");
		}
	});	
	//讀取當下factory post
	const postReadF = firebase.database().ref('post');
	postReadF.orderByChild('factory').equalTo(location.hash).on('value', function(snapshot){
		var parts = snapshot.key.split(',');
		var uid = parts[1];
		var time = parts[0];
		var title = snapshot.val().title;
		var picture = snapshot.val().picture;
		var words = snapshot.val().words;
		var auth; //uid轉換成作者名字
		var authpath = firebase.database().ref("user/"+uid);
		authpath.on('value', snap =>{	  
			auth = snap.val().displayName;
		});
		//動態新增block,待補
		ckLike();
	});
	
	//讀取當下user post
	const postReadU = firebase.database().ref('post');
	var myhash = location.hash.split('#');
	postReadU.orderByChild('uid').equalTo(myhash[1]).on('value', function(snapshot){
		var parts = snapshot.key.split(',');
		var uid = parts[1];
		var time = parts[0];
		var title = snapshot.val().title;
		var words = snapshot.val().words;
		var picture = snapshot.val().picture;
		var factory = snapshot.val().factory;
		var auth; //uid轉換成作者名字
		var authpath = firebase.database().ref("user/"+uid);
		authpath.on('value', snap =>{	  
			auth = snap.val().displayName;
		});
		//動態新增block,待補
		ckLike();
	});
	
	//onclick=like(this.id);
	function like(post){
		var nowPost = document.getElementById(post);
		var path = firebase.database().ref("user/"+uid);
		path.on('value', snap =>{
			var likelist = snap.val().like;
			
			if(nowPost.classList.contains('active')){
				nowPost.classList.remove("active");
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
				nowPost.classList.add("active");				
				if(likelist=="none"){
					path.update({ // in database
						like : post+","					
					});
				}else{
					path.update({ // in database
						like : post+","	+likelist				
					});
				}
			}
		});
	}
	
	function youLike(){
		var path = firebase.database().ref("user/"+uid);
		path.on('value', snap =>{
			var likelist = snap.val().like;
			if(likelist!="none"){
				var part = likelist.split(",");
				for(var i=0;i<part.length;i++){
					postReadU.Child(part[i]).on('value', function(snapshot){
						var parts = snapshot.key.split(',');
						var uid = parts[1];
						var time = parts[0];
						var title = snapshot.val().title;
						var words = snapshot.val().words;
						var picture = snapshot.val().picture;
						var factory = snapshot.val().factory;
						var auth; //uid轉換成作者名字
						var authpath = firebase.database().ref("user/"+uid);
						authpath.on('value', snap =>{	  
							auth = snap.val().displayName;
						});
						//動態新增block,待補
					});
				}
				ckLike();
			}
		});
	}
	
	function ckLike(){
		var path = firebase.database().ref("user/"+uid);
		path.on('value', snap =>{
			var likelist = snap.val().like;
			if(likelist!="none"){
				var part = likelist.split(",");
				for(var i=0;i<part.length;i++){
					if(document.getElementById(part[i])){
						document.getElementById(part[i]).classList.add("active");
					}
				}				
			}
		});
	}
	
}());