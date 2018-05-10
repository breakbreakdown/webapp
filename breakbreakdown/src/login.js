import firebase from 'firebase'

var userData;
var token;
var config = {
    apiKey: "AIzaSyBzenkKKf1b7eyYHboHgcBL9N6mQAjpB2g",
    authDomain: "breakbreakdown-64b8a.firebaseapp.com",
    databaseURL: "https://breakbreakdown-64b8a.firebaseio.com",
    projectId: "breakbreakdown-64b8a",
    storageBucket: "breakbreakdown-64b8a.appspot.com",
    messagingSenderId: "534313689390"
  };
firebase.initializeApp(config);


function handleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    alert(JSON.stringify(user));
    var name = user.displayName.split(" ");
    // Take out middle name if account has it
    if (name.length == 3) {
      name[1] = name[0];
      name.shift();
    }
    userData = {
      "userID": user.uid,
      "firstName": user.displayName.split(" ")[0],
      "lastName": user.displayName.split(" ")[1],
      "email": user.email
    };
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
}

export default handleSignIn;
export {userData, token};
