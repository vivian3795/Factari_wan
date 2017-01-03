(function(){  
	//讀取當下factory post
	var hash = location.href.split(location.pathname+"?");
	var query = firebase.database().ref("/post/"+hash[1]);
		query.once("value")
			.then(function(snapshot) {
				var parts = snapshot.key.split('&');
				var uid = parts[1];
				var time = parts[0];
				var title = snapshot.val().title;
				var url = snapshot.val().picture;
				var words = snapshot.val().words;
				var auth; //uid轉換成作者名字
				var authpath = firebase.database().ref("user/"+uid);
				authpath.once("value").then(function(snap) {	  
					auth = snap.val().displayName;
					document.getElementById('picture').src=url;
					document.getElementById('title').innerHTML = title;
					document.getElementById('T').innerHTML = time ;
					document.getElementById('A').innerHTML = auth ;
					document.getElementById('A').href = "person.html#"+uid ;
				});
		//		ckLike();
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