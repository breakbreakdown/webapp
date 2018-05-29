import ApiCalendar from './ApiCalendar.js';
import React from 'react';
import firebase from 'firebase';
import AddEvent from './AddEvent.js';
import AddEventPopup from './AddEventPopup.js';
import Checklist from './Checklist.js';
import ColorPalette from './ColorPalette.js';
import EventDetails from './EventDetails.js';
import Graph from './Graph.js';
import Settings from './Settings.js';
import Toolbar from './Toolbar.js';
import './home.css';
import fire from './fireB.js';
import * as U from './user.js'

let events = {};

var database = fire.database();

//path to user
var databaseRef = database.ref('users/' + localStorage.getItem('appTokenKey'));

class home extends React.Component {

	componentDidMount() {
		ApiCalendar.handleAuthClick();
		var signChanged = function (val) {
			console.log("Signed in:", val);
			if (val) {
				events = ApiCalendar.listUpcomingEvents(25);//load max of 25 events
				console.log(events);
				writeUserData(localStorage.getItem('appTokenKey'), events);
				ApiCalendar.handleSignoutClick();
			} else {

			}
		};
		ApiCalendar.listenSign(signChanged);
		//console.log(events['1coub2oqli7hh2ha2j4rdlhmvf']);
  }

	render() {
		return (
			<div>
				<div id='home'>
				<div id='top'>
					<Toolbar />
				</div>
				<div id='content'>
					<div id='left-column'>
						<Graph />
					</div>
					<div id='right-column'>
						<Checklist />
						<AddEvent />
					</div>
				</div>
			</div>
			</div>

		);
	}
}

function writeUserData(userId, eventsArr) {
	var date = new Date();
	var month = date.getUTCMonth() + 1; //months from 1-12
	var day = date.getUTCDate();
	var year = date.getUTCFullYear();
	var newDate = year + "-" + month + "-" + day;

		writeNewEvent('dayKey', newDate);

}

//Writes all the users new events to firebase
function writeNewEvent(dayKey, newDate) {

	//stores all the events that need to be updated
	var updates = {};

	//PUT EVERYTHING BELOW HERE IN A FOR LOOP ONCE WE FIGURE OUT HOW TO DO THE LOCAL EVENT OBJECT
	for (var i = 1; i < 3; i++) {
		// An event entry.
	  var eventData = {
			eventName: 'eventName',
			colorId: 'colorId',
	    duration: 'duration',
	    startTime: 'startTime',
	    endTime: 'endTime',
	    location: '0',
	    notes: 'update'
	  };

	  // Get a key for a new event.
		//Once we get eventID from google we will use Authorization instead of 'i'
	  var newPostKey = databaseRef.ref.child('' + i).key;

		//adds the event with data into updates array
	  updates['/days/' + newDate + '/' + newPostKey] = eventData;

}
	//pushes updates to firebase
  return database.ref('users/' + localStorage.getItem('appTokenKey')).update(updates);
}

 export default home;
