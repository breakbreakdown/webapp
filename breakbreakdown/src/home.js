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

class home extends React.Component {

	componentDidMount() {
		ApiCalendar.handleAuthClick();
		var signChanged = function (val) {
			console.log("Sign in:", val);
			if (val) {
				console.log(ApiCalendar.listUpcomingEvents(25));
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
