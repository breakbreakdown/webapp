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
				ApiCalendar.handleSignoutClick();
			} else {

			}
		};
		ApiCalendar.listenSign(signChanged);
		//console.log(events['1coub2oqli7hh2ha2j4rdlhmvf']);
		//writeUserData(localStorage.getItem('appTokenKey'), events);
		console.log(localStorage.getItem('appTokenKey'));
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

function writeUserData(userId, event) {
	var usersRef = database.ref('users/' + userId);
  usersRef.update({
		days[0]: event
  });
}
 export default home;
