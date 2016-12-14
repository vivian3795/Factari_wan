(function(){ 
  
  var config = {
    apiKey: "AIzaSyC6S1EiWCP6lk1lGLTgFxxuylGXPfT23y8",
    authDomain: "factory-ddb70.firebaseapp.com",
    databaseURL: "https://factory-ddb70.firebaseio.com",
    storageBucket: "factory-ddb70.appspot.com",
    messagingSenderId: "795740952180"
  };
  firebase.initializeApp(config); 	

  var phurl;
  var ph = document.getElementById('ph');
  var file = document.getElementById('file');
  var submit = document.getElementById('submit');
  
  var uploader = document.getElementById('uploader');
  file.addEventListener('change',function(e) {
	//get file
	var up = e.target.files[0];
	//create a storage ref
	var storageRef = firebase.storage().ref("user/"+firebase.auth().currentUser.uid+"/photo.jpg");
	//upload file
	var task = storageRef.put(up);
	//update progress bar
	task.on('state_changed',
		function progress(snapshot){
			var p = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
			uploader.value = p;
		},function error(err){
			console.log("err");
		},function complete(){
			console.log("fin");
		}
	);
	storageRef.getDownloadURL().then(function(url) {
		ph.classList.remove("hide");
		phurl = url;
	})
  });
  
  ph.src = phurl;
  
  submit.addEventListener('click', e =>{
		var user = firebase.auth().currentUser;
		user.updateProfile({
			displayName: document.getElementById("inputUser").value,
			photoURL: phurl
		}).then(function() {
		// Update successful.
		}, function(error) {
		// An error happened.
		});
	});
  
 firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    console.log("now log in"); 
	}else{
    console.log("not log in");
	}
  });
  
}());
