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
		var y = n.getFullYear();
		var m = (n.getMonth()+1< 10)?("0" + (n.getMonth() + 1)):(n.getMonth() + 1);
		var d = (n.getDate()< 10)?("0" + (n.getDate())):(n.getDate());
		var h = (n.getHours() + 8< 10)?("0" + (n.getHours() + 8)):(n.getHours() + 8);
		var mi = (n.getMinutes()< 10)?("0" + (n.getMinutes())):(n.getMinutes());
		var s = (n.getSeconds()< 10)?("0" + (n.getSeconds())):(n.getSeconds());

		now = y+"-"+m+"-"+d+" "+h+":"+mi+":"+s;
	}
	
	const commentWrite = document.getElementById("commentWrite");
	commentWrite.addEventListener('click', e =>{
		var user = firebase.auth().currentUser;		
		if (user != null) {
			const uid = user.uid; 
			var title = document.getElementById("title").value;
			var words = document.getElementById("words").value;
			var Ref = firebase.database().ref('comment/'+title"#"+time);
			//照片上傳檔案庫
			var storageRef = firebase.storage().ref("comment/"+title"#"+now+".jpg");
			storageRef.put(up);
			storageRef.getDownloadURL().then(function(url) {
				Ref.set({	//寫入資料庫
					picture : url,		
					auth: uid,
					words: words,
					factory : location.hash //#工廠,待補
				});
			});				
		}else{
			 console.log("please log in");
		}
	});	
	
}());