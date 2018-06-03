import React from 'react';
import firebase from 'firebase';
import Materialize from 'materialize-css';
import './checklist.css';
import fire from './fireB.js'
import ChecklistItem from './ChecklistItem'
import EventDetails from './EventDetails';

var database = firebase.database();
var user = firebase.auth().currentUser;

class Checklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = { events: [], currTime: 0, currEvent: [] }
	}

	componentDidMount() {
		var today = new Date();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		var year = today.getFullYear();
		var currDay = year + '-' + month + '-' + day;
		var colors = ['#7986cb', '#33b679', '#8e24aa', '#e67c73', '#f6c026', '#f5511d', '#039be5', '#616161', '#3f51b5', '#0b8043', '#d60000', '#5484ed'];
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				var userEventRef = firebase.database().ref('users/' + user.uid + '/days/' + year + '-' + month + '-' + day);
                userEventRef.on('value', function (snapshot) {
                    var newStateArray = []
					snapshot.forEach(function (childSnapshot) {
                        var value = childSnapshot.val();
                    
                            newStateArray.push({
                                x: " ", y: value.y, label: value.eventName,
                                duration: value.duration, startTime: value.startTime,
                                endTime: value.endTime, location: value.location, notes: value.notes,
                                eventRef: 'users/' + user.uid + '/days/' + year + '-' + month + '-' + day + '/' + childSnapshot.key,
								color: colors[value.colorId - 1]
                            });
                    }.bind(this));
                    this.setState({ events: newStateArray })
				}.bind(this));
			} else {
				// No user is signed in.
			}
		}.bind(this));
		console.log('checklist');
		console.log(this.state.events);
		console.log(this.state.events[1]);

	}

	componentWillMount() {
		var d = new Date();
		var totalMilliseconds = (d.getHours() * 3600000) + (d.getMinutes() * 60000) + (d.getSeconds() * 1000);
		this.setState({
			events: [],
			currTime: totalMilliseconds
		});
	}
	
	render() {
		return (
			<div id='checklist'>
			
				<span id='checklist-title'> Checklist </span>
			
				<ul className='collection'>
					{Object.keys(this.state.events).map((d) => {
						return <ChecklistItem key={d} index={d} currEvent={this.state.events[d]}/>
					})}
				</ul>
				
        
			</div>
		);
	}
}
 export default Checklist;