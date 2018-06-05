import ApiCalendar from './ApiCalendar.js';
import React, { Component } from 'react';
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

//in initial constructor set the
var database = fire.database();

//path to user
var databaseRef = database.ref('users/' + localStorage.getItem('appTokenKey'));

class home extends Component {
	constructor(props) {
			super(props);
			this.writeNewEvent = this.writeNewEvent.bind(this);
	}

	componentDidMount() {
		let currComp = this;
		ApiCalendar.handleAuthClick();
		var signChanged = function (val) {
			if (val) {
				ApiCalendar.listUpcomingEvents(25).then(function(myEvents){
					//DO ALL EVENTS ?HANDLING HERE
					console.log(myEvents);
					currComp.writeNewEvent(myEvents);
				}).catch(function(err){
				  //What happens if the promise was rejected
				});
				ApiCalendar.handleSignoutClick();
			}
		}
		ApiCalendar.listenSign(signChanged);
	}

	//Writes all the users new events to firebase
	writeNewEvent(myEvents) {
		console.log('write new event started')
		var date = new Date();
		var month = date.getMonth() + 1; //months from 1-12
		var day = date.getDate();
		var year = date.getFullYear();
		var newDate = year + "-" + month + "-" + day;

		//stores all the events that need to be updated
		var updates = {};
		for (var i = 0; i < myEvents.length; i++) {
			console.log('new event forloop entered');
			var singleEvent = myEvents[i];

			var eventPath = database.ref('users/' + localStorage.getItem('appTokenKey') + '/days/' + newDate + '/' + singleEvent.eventId);

			var completed = false;
			eventPath.on('value', function(snapshot) {
						var value = snapshot.val();
				console.log('looking at event');
  			if (value != null && value.completed == true) {
					completed = true;
				}
			});

			var eventName = singleEvent.eventName || "Unnamed Event";
			var colorId = singleEvent.colorId || "12";
			var startTime = singleEvent.startTime || "";
			var endTime = singleEvent.endTime || "";
			var duration = endTime.getTime - startTime.getTime || "30";
			var location = singleEvent.location || "";
			var notes = singleEvent.notes || "";

            if (startTime != "" && endTime != "") {

                var startHr = parseFloat(startTime.substr(11).split('-')[0].split(':')[0]);
			    var startMin = parseFloat(startTime.substr(11).split('-')[0].split(':')[1]) / 60;
			    var startFloat = startHr + startMin;
			    var endHr = parseFloat(endTime.substr(11).split('-')[0].split(':')[0]);
			    var endMin = parseFloat(endTime.substr(11).split('-')[0].split(':')[1]) / 60;
			    var endFloat = endHr + endMin
			    var totalTime = endFloat - startFloat;
            }
			//An event entry.
			//USE THIS ONE FOR SENDING REAL DATA

            var eventData = {
                eventName: eventName,
                colorId: colorId,
                duration: Math.floor(totalTime) + 'Hour(s) ' + Math.floor((totalTime % 1.0 * 60)) + 'Min(s)',
                startTime: startTime,
                endTime: endTime,
                location: location,
                notes: notes,
                completed: completed,
                y: totalTime || "",
                type: 'Event'
            };

			//Use this one for sending DUMMY CODE
			// var eventData = {
			// 	eventName: 'sample event',
			// 	colorId: '5',
		  //   duration: '30',
		  //   startTime: '2018-05-29T09:00:00-07:00',
		  //   endTime: '2018-05-29T17:00:00-10:00',
		  //   location: 'info 461',
		  //   notes: 'this is the notes which will appear in the description of the dummy event'
		  // };

		  // Get a key for a new event.
			//Once we get eventID from google we will use Authorization instead of 'i'
		  var newPostKey = databaseRef.ref.child('' + singleEvent.eventId).key;

			// //adds the event with data into updates array
		  updates['/' + newPostKey] = eventData;
		  console.log(updates);
	   }
		//pushes updates to firebase
	  return database.ref('users/' + localStorage.getItem('appTokenKey') + '/days/' + newDate).update(updates);
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


 export default home;
