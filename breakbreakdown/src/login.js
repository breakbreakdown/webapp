import firebase from 'firebase'
import * as U from './user.js'

var config = {
    apiKey: "AIzaSyBzenkKKf1b7eyYHboHgcBL9N6mQAjpB2g",
    authDomain: "breakbreakdown-64b8a.firebaseapp.com",
    databaseURL: "https://breakbreakdown-64b8a.firebaseio.com",
    projectId: "breakbreakdown-64b8a",
    storageBucket: "breakbreakdown-64b8a.appspot.com",
    messagingSenderId: "534313689390"
  };
firebase.initializeApp(config);

export default function handleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    var name = user.displayName.split(" ");
    // Take out middle name if account has it
    if (name.length == 3) {
      name[1] = name[0];
      name.shift();
    }
    // Sets up global variables in user.js
    U.initUserData(user.uid, name[0], name[1], user.email, token);
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
