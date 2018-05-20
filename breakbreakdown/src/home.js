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

//ApiCalendar.handleAuthClick();

class home extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      done: false
    }
  }

	componentDidMount() {
    ApiCalendar.handleAuthClick();
		if (this.state.done) {//user is authorized in
			console.log("Events: " + JSON.stringify(ApiCalendar.listUpcomingEvents(10)));
		}
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
