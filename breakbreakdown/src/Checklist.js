import React from 'react';
import firebase from 'firebase';
import Materialize from 'materialize-css';
import './checklist.css';
import ChecklistItem from './ChecklistItem'
import EventDetails from './EventDetails';

var config = {
	apiKey: "AIzaSyBzenkKKf1b7eyYHboHgcBL9N6mQAjpB2g",
	authDomain: "breakbreakdown-64b8a.firebaseapp.com",
	databaseURL: "https://breakbreakdown-64b8a.firebaseio.com",
	projectId: "breakbreakdown-64b8a",
	storageBucket: "breakbreakdown-64b8a.appspot.com",
	messagingSenderId: "534313689390"
};

var database = firebase.database();
var user = firebase.auth().currentUser;

class Checklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {events:[]}
	}
	
	componentDidMount(){
		

		var today = new Date();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		var year = today.getFullYear();
		var currDay = year + '-' + month + '-' + day;
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				var userEventRef = firebase.database().ref('users/' + user.uid + '/days/' + year + '-' + month + '-' + day);
				userEventRef.on('value', function (snapshot) {
					snapshot.forEach(function (childSnapshot) {
						var value = childSnapshot.val();
						var newStateArray = this.state.events;
						newStateArray.push({ x: " ", y: value.y, label: value.eventName, duration: value.duration, startTime: value.startTime, endTime: value.endTime, location: value.location, notes: value.notes });
						this.setState({ events: newStateArray })
					}.bind(this));
				}.bind(this));
			} else {
				// No user is signed in.
			}
		}.bind(this));
	}

	componentWillMount() {
		var d = new Date();
		var totalMilliseconds = (d.getHours() * 3600000) + (d.getMinutes() * 60000) + (d.getSeconds() * 1000);
		this.setState({
			events: [],
			currTime: totalMilliseconds
		});
	}
	
	render() {
		return (
			<div id='checklist'>
			
				<span id='checklist-title'> Checklist </span>
			
				<ul className='collection'>
					{Object.keys(this.state.events).map((d) => {
						return <ChecklistItem key={d} index={d} currEvent={this.state.events[d]}/>
					})}
				</ul>
				
        
			</div>
		);
	}
}
 export default Checklist;