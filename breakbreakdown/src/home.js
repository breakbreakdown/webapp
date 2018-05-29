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



let eventsArray = {};

var database = fire.database();

//path to user
var databaseRef = database.ref('users/' + localStorage.getItem('appTokenKey'));

class home extends React.Component {

    componentDidMount() {
        ApiCalendar.handleAuthClick();
        var signChanged = function (val) {
            console.log("Signed in:", val);
            if (val) {
                eventsArray = ApiCalendar.listUpcomingEvents(25);
                //load max of 25 events
                //ApiCalendar.createEvent('name', 'location', 'notes', '5', 'startTime', 'endTime', 'recurrence');
                console.log(eventsArray);
                //writeUserData(localStorage.getItem('appTokenKey'));
                ApiCalendar.handleSignoutClick();
            } else {

            }
        };
        ApiCalendar.listenSign(signChanged);
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

function writeUserData(userId) {
    var date = new Date();
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var newDate = year + "-" + month + "-" + day;

    console.log('WriteUserData done, moving to  writeNewEvent...');
    writeNewEvent(newDate);

}

//Writes all the users new events to firebase
function writeNewEvent(newDate) {
    console.log('writeNewEvent initiated');
    console.log(eventsArray);

    //stores all the events that need to be updated
    var updates = {};

    //PUT EVERYTHING BELOW HERE IN A FOR LOOP ONCE WE FIGURE OUT HOW TO DO THE LOCAL EVENT OBJECT
    for (var i = 0; i < 2; i++) {
        //for (let i = 0; i < eventsArray.length; i++) {
        console.log('for loop started. Currently on pass ' + i);
        console.log(eventsArray);
        console.log(eventsArray[Object.keys(eventsArray)[0]]);
        console.log(eventsArray['0']);
        var singleEvent;
        setTimeout(() => {
            singleEvent = eventsArray[i];
        }, 2000);
        //var singleEvent = eventsArray[i];
        //var event = eventsArray[i];
        console.log(singleEvent);
        //var eventName = ''+singleEvent.eventName

        // An event entry.
        //USE THIS ONE FOR SENDING REAL DATA
        var eventData = {
            eventName: singleEvent.eventName,
            colorId: singleEvent.colorId,
            duration: singleEvent.duration,
            startTime: singleEvent.startTime,
            endTime: singleEvent.endTime,
            location: singleEvent.location,
            notes: singleEvent.notes
        };


        //Use this one for sending DUMMY CODE
		/*
		var eventData = {
			eventName: 'sample event',
			colorId: '5',
	    duration: '30',
	    startTime: '2018-05-29T09:00:00-07:00',
	    endTime: '2018-05-29T17:00:00-10:00',
	    location: 'info 461',
	    notes: 'this is the notes which will appear in the description of the dummy event'
	  };
		*/

        console.log('event data found' + i);
        // Get a key for a new event.
        //Once we get eventID from google we will use Authorization instead of 'i'
        var newPostKey = databaseRef.ref.child('' + i).key;

        //adds the event with data into updates array
        updates['/days/' + newDate + '/' + newPostKey] = eventData;
        console.log('event data loaded into array for index ' + i);
    }
    //pushes updates to firebase
    return database.ref('users/' + localStorage.getItem('appTokenKey')).update(updates);
    console.log('event data pushed');
}

export default home;
