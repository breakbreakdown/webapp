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
import './home.css';
import Materialize from 'materialize-css';
import $ from 'jquery';
 
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

		$(document).ready(function () {
			Materialize.updateTextFields();
		});
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
				<div id='home-overlay'></div>
			</div>
			</div>

		);
	}
}
 export default home;