(function(){ 
  
  var config = {
    apiKey: "AIzaSyC6S1EiWCP6lk1lGLTgFxxuylGXPfT23y8",
    authDomain: "factory-ddb70.firebaseapp.com",
    databaseURL: "https://factory-ddb70.firebaseio.com",
    storageBucket: "factory-ddb70.appspot.com",
    messagingSenderId: "795740952180"
  };
  firebase.initializeApp(config); 	
	
  const login = document.getElementById("login");
  const signup = document.getElementById("signup");
   
  login.addEventListener('click', e =>{
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		history.back();
    }, function(error) {
		location.reload();
    });
  });
  
  signup.addEventListener('click', e =>{
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        history.back();
    }, function(error) {
		location.reload();
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