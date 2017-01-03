(function(){   
  var config = {
    apiKey: "AIzaSyC6S1EiWCP6lk1lGLTgFxxuylGXPfT23y8",
    authDomain: "factory-ddb70.firebaseapp.com",
    databaseURL: "https://factory-ddb70.firebaseio.com",
    storageBucket: "factory-ddb70.appspot.com",
    messagingSenderId: "795740952180"
  };
  firebase.initializeApp(config); 

  const sign = document.getElementById("sign");
  const out = document.getElementById("out");
  const name = document.getElementById("name");
  const person = document.getElementById("person");
  out.addEventListener('click', e =>{
    firebase.auth().signOut().then(function() {
			console.log("success");
		}, function(error) {
			console.log("fail");
	});
  });
  
  firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    console.log("now log in"); 
	sign.classList.add("hide");
  	name.classList.remove("hide");
    var uid = firebase.auth().currentUser.uid;
    var Ref = firebase.database().ref('user/' + uid);
    Ref.on("value", function(snapshot) {
      document.getElementById("Uname").innerHTML = snapshot.val().displayName;    
    }); 
	person.href="person.html?"+uid;
  }else{
    console.log("not log in");
	 name.classList.add("hide");
	 sign.classList.remove("hide");
  }
  });
  
}());