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
	var daysRef = database.ref('users/' + userId + '/days/' + newDate);

	console.log(eventsArr[0]);//this thing needs to be fixed
	for (var i = 0; i < eventsArr.length; i++) {
		console.log(eventsArr[i].id);
		daysRef.set({
			event: eventsArr[i].id
		});
	}



}
 export default home;
