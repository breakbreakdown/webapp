import React from 'react';
import firebase from 'firebase';
import M from 'react-materialize';
import Materialize from 'materialize-css';
import './graph.css';
import './home.css';
import { VictoryPie, VictoryTooltip } from 'victory';
import Countdown from 'react-countdown-now';
import EventDetails from './EventDetails';
import EventEdit from './EventEdit';
import $ from 'jquery';

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

class Graph extends React.Component {
	constructor(props) {
		super(props);
        this.state = { events: [], currTime: 0, currEvent: { x: " ", y: 6, label: "Fortnite Grind", duration: "6 Hour(s)", startTime: "1:30 PM", endTime: "7:30 PM", location: "Home", notes: "Get Better" } }
        this.setEvent = this.setEvent.bind(this);
	}

    setEvent(newEvent) {
        this.setState({ currEvent: newEvent });
    }

    //componentDidMount() {
    //    var today = new Date();
    //    var dd = today.getDate();
    //    var userEventRef = firebase.database().ref('events/' + user.uid + '/days/' + dd);
    //    userEventRef.on('value', function (snapshot) {
    //        snapshot.forEach(function (childSnapshot) {
    //            var value = childSnapshot.val();
    //            var newStateArray = this.state.events;
    //            newStateArray.push({ x: " ", y: value.duration, label: values.eventName, duration: values.duration, startTime: values.startTime, endTime: values.endTime, location: values.location, notes: values.notes });
    //        });
    //    });
    //}

	componentWillMount() {
		var d = new Date();
		var totalMilliseconds = (d.getHours() * 3600000) + (d.getMinutes() * 60000) + (d.getSeconds() * 1000);
        this.setState({
            events: [{ x: " ", y: 6, label: "Fortnite Grind", duration: "6 Hour(s)", startTime: "1:30 PM", endTime: "7:30 PM", location: "Home", notes: "Get Better" },
                    { x: " ", y: 1, label: "Info 462 HW", duration: "1 Hour(s)", startTime: "12:30 PM", endTime: "1:30 PM", location: "Colab", notes: "Finish the graph section" },
                    { x: " ", y: 2, label: "Capstone Work", duration: "2 Hour(s)", startTime: "7:30 PM", endTime: "9:30 PM", location: "Info Lounge", notes: "Capstone Sucks" }],
            currTime: totalMilliseconds
        });
	}
	
	getTotalEventTime() {
		var totalEventTime = 0;
		var i;
		for (i = 0; i < this.state.events.length; i++) {
			totalEventTime += this.state.events[i].y * 3600000;
		}
		return totalEventTime;
	}
	
    render() {
        var currIndex = 0;
        var popup = <EventDetails event={this.state.currEvent.label} duration={this.state.currEvent.duration} startTime={this.state.currEvent.startTime}
            endTime={this.state.currEvent.endTime} location={this.state.currEvent.location} notes={this.state.currEvent.notes} />;

		return (
		  <div id='graph'> 
			<VictoryPie
			  colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
			  data={this.state.events}
			  innerRadius={150}
			  padding={{ top: 0, bottom: 0 }}
              labelComponent={<VictoryTooltip />}
			  events={[{
					  target: "data",
					  eventHandlers: {
                            onClick: (evt, clickedProps) => {
                                currIndex = clickedProps.index;
                                popup = <EventDetails event={this.state.events[currIndex].label} duration={this.state.events[currIndex].y} startTime={this.state.events[currIndex].startTime}
                                    endTime={this.state.events[currIndex].endTime} location={this.state.events[currIndex].location} notes={this.state.events[currIndex].notes} />
                              this.setEvent(this.state.events[currIndex]);
                              var elems = document.querySelectorAll('.modal');
                              var instances = Materialize.Modal.init(elems);
                              var instance = Materialize.Modal.getInstance($('#event-details-popup'));
                              instance.open();
						}
					  }
					}]}
                />
                <div id='event-details-popup' className='modal event-details-popup'>
                    <div className="modal-content">
                        {popup}
                    </div>
                </div>
				<div id={'event-edit-popup-' + this.props.index} className='modal event-edit-popup'>
                            <div className='modal-content'>
                                <EventEdit event={this.state.currEvent.label} />
                            </div>
                        </div>
			    <div id="freetime-countdown">
				    <div id="freetime-text"> Free Time </div>
				    <div>
					    <Countdown date={Date.now() + 86400000 - this.state.currTime - this.getTotalEventTime()} />
				    </div>
			    </div>
			
			    <div id="totaltime-left">
				    <div id="totaltime-left-text"> Time Left in Day </div>
				    <div>
					    <Countdown date={Date.now() + 86400000 - this.state.currTime} />
				    </div>
			    </div>
		      </div>
		);
	}
}
 export default Graph;