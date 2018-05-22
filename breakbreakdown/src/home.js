import ApiCalendar from './ApiCalendar.js';
import React from 'react';
import Firebase from 'firebase';
import AddEvent from './AddEvent.js';
import AddEventPopup from './AddEventPopup.js';
import Checklist from './Checklist.js';
import ColorPalette from './ColorPalette.js';
import EventDetails from './EventDetails.js';
import Graph from './Graph.js';
import Settings from './Settings.js';
import Toolbar from './Toolbar.js';
 
let events = {};

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
  }

	render() {
		return (
		  <div>
				Waiting for authorization...
			</div>

		);
	}
}
 export default home;
