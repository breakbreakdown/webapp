import React, { Component, PropTypes } from 'react';
import firebase from 'firebase'
import {BrowserRouter as Router, Route, browserHistory, Redirect } from 'react-router-dom'

const appTokenKey = "appToken";
const firebaseAuthKey = "firebaseAuthInProgress";

class App extends React.Component {
	render() {
		/*firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
				console.log("logged in");
				return <Redirect to="/home" />
		  }
		  console.log("not logged in");
			return <Redirect to="/signin" />
		});
		return <Redirect to="/signin" />*/
		if (localStorage.getItem(appTokenKey)) {
    	return <Redirect to="/home" />
    }
		firebase.auth().onAuthStateChanged(user => {
	    if (user) {
	        console.log("User signed in: ", JSON.stringify(user));
	        localStorage.removeItem(firebaseAuthKey);
	        // here you could authenticate with you web server to get the
	        // application specific token so that you do not have to
	        // authenticate with firebase every time a user logs in
	        localStorage.setItem(appTokenKey, user.uid);
	        this.props.history.push("/home")
	    }
        });
		return <Redirect to="/signin" />
	}
}
export default App;
