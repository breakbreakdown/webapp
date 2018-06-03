import React from 'react';
import firebase from 'firebase';
import fire from './fireB.js'
import M from 'react-materialize';
import Materialize from 'materialize-css';
import './graph.css';
import './home.css';
import { VictoryPie, VictoryTooltip } from 'victory';
import Countdown from 'react-countdown-now';
import EventDetails from './EventDetails';
import EventEdit from './EventEdit';
import $ from 'jquery';


var database = firebase.database();
var user = firebase.auth().currentUser;

class Graph extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            events: [], currTime: 0,
            currEvent: {
                x: " ", y: 6, label: "Fortnite Grind",
                duration: "6 Hour(s)", startTime: "1:30 PM",
                endTime: "7:30 PM", location: "Home", notes: "Get Better"
            },
            isChanged: false,
            eventColors: []
        }
        this.setEvent = this.setEvent.bind(this);
        this.renderGraph = this.renderGraph.bind(this);
	}

    setEvent(newEvent) {
        this.setState({ currEvent: newEvent });
    }

    componentDidMount() {
       var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
       var today = new Date();
	   var month = today.getMonth() + 1;
       var day = today.getDate();
	   var year = today.getFullYear();
       var currDay = year + '-' + month + '-' + day;
        var date = months[month - 1].substring(0, 3)
        var colors = ['#7986cb', '#33b679', '#8e24aa', '#e67c73', '#f6c026', '#f5511d', '#039be5', '#616161', '#3f51b5', '#0b8043', '#d60000', '#5484ed'];
	   firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			var userEventRef = firebase.database().ref('users/' + user.uid + '/days/' + currDay);
              userEventRef.on('value', function (snapshot) {
                  var newStateArray = []
                  var newEventColors = []
                  snapshot.forEach(function (childSnapshot) {
                      var value = childSnapshot.val();
                      if (!value.completed) {
                          newStateArray.push({
                              x: " ", y: value.y, date: currDay, title: value.eventName, label: value.eventName + " Duration: " + value.duration,
                              duration: value.duration, startTime: value.startTime, endTime: value.endTime,
                              location: value.location, notes: value.notes, completed: value.completed, color: colors[parseInt(value.colorId) - 1]
                          });
                          console.log(colors[parseInt(value.colorId) - 1]);
                          newEventColors.push(colors[parseInt(value.colorId) - 1]);
                      }
                  }.bind(this));
                  this.setState({ events: newStateArray, eventColors: newEventColors })
			}.bind(this));
		  } else {
			// No user is signed in.
		  }
		}.bind(this));
       
    }

	componentWillMount() {
		var d = new Date();
		var totalMilliseconds = (d.getHours() * 3600000) + (d.getMinutes() * 60000) + (d.getSeconds() * 1000);
        this.setState({events: [],
            currTime: totalMilliseconds
        });
	}
	
	getTotalEventTime() {
		var totalEventTime = 0;
		var i;
		for (i = 0; i < this.state.events.length; i++) {
			totalEventTime += this.state.events[i].y * 3600000;
		}
		console.log(totalEventTime);
		return totalEventTime;
	}

    renderGraph(currEvents) {
        var currIndex = 0;
        if (currEvents.length == 0) {
            return <VictoryPie
                colorScale={["gray"]}
                data={[{ x: " ", y: 1, label: "No Events Today" }]}
                innerRadius={150}
                padding={{ top: 0, bottom: 0 }}
                labelComponent={<VictoryTooltip />}
            />;
        } else {
           return <VictoryPie
               colorScale={this.state.eventColors}
                data={currEvents}
                innerRadius={150}
                padding={{ top: 0, bottom: 0 }}
               labelComponent={<VictoryTooltip flyoutStyle={{
                               stroke: (d) => d.color != " " ?
                                   d.color : "black"
                               }}/>}
                events={[{
                    target: "data",
                    eventHandlers: {
                        onClick: (evt, clickedProps) => {
                            currIndex = clickedProps.index;

                            this.setEvent(currEvents[currIndex]);
                            var elems = document.querySelectorAll('.modal');
                            var instances = Materialize.Modal.init(elems);
                            var instance = Materialize.Modal.getInstance($('#event-details-popup-graph'));
                            instance.open();
                        }
                    }
                }]}
            />
        }

    }

    render() {
        

		return (
            <div id='graph'> 
                {this.renderGraph(this.state.events)}
                <div id='event-details-popup-graph' className='modal event-details-popup'>
                    <div className="modal-content">
                        <EventDetails event={this.state.currEvent.title} duration={this.state.currEvent.duration} startTime={this.state.currEvent.startTime}
                            endTime={this.state.currEvent.endTime} location={this.state.currEvent.location} notes={this.state.currEvent.notes} date={this.state.currEvent.date}/>
                    </div>
                </div>
				<div id={'event-edit-popup-' + this.props.index} className='modal event-edit-popup'>
                            <div className='modal-content'>
                                <EventEdit event={this.state.currEvent.title} duration={this.state.currEvent.duration} startTime={this.state.currEvent.startTime}
                                endTime={this.state.currEvent.endTime} location={this.state.currEvent.location} notes={this.state.currEvent.notes} date={this.state.currEvent.date} />
                            </div>
				</div>

				<div id='countdowns'>
			    <div id="freetime-countdown">
				    <div id="freetime-text"> Free Time </div>
				    <div id="freetime-counter">
					    <Countdown date={Date.now() + 86400000 - this.state.currTime - this.getTotalEventTime()} />
				    </div>
			    </div>
			
			    <div id="totaltime-left">
				    <div id="totaltime-left-text"> Time Left in Day </div>
					<div id="totaltime-counter">
					    <Countdown date={Date.now() + 86400000 - this.state.currTime} />
				    </div>
			    </div>
		      </div>
		      </div>
		);
	}
}
 export default Graph;