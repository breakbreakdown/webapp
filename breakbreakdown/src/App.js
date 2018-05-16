import React, { Component, PropTypes } from 'react';
import firebase from 'firebase'
import {BrowserRouter as Router, Route, browserHistory, Redirect } from 'react-router-dom'

class App extends React.Component {

	render() {
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
				console.log("logged in");
				return <Redirect from="/" to="/home" />
		  } else {
			  console.log("not logged in");
				return <Redirect from="/" to="/signin" />
		  }
		});
		return(<div></div>)
	}
}
export default App;
