import React from 'react';
import Firebase from 'firebase';
import Materialize from 'materialize-css';
import './checklist.css';
import ChecklistItem from './ChecklistItem'
import EventDetails from './EventDetails';


class Checklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {events:[]}
	}
	
	componentDidMount(){
		var events = [{ x: " ", y: 6, label: "Fortnite Grind", duration: "6 Hour(s)", startTime: "1:30 PM", endTime: "7:30 PM", location: "Home", notes: "Get Better" },
		{ x: " ", y: 1, label: "Info 462 HW", duration: "1 Hour(s)", startTime: "12:30 PM", endTime: "1:30 PM", location: "Colab", notes: "Finish the graph section" },
		{ x: " ", y: 2, label: "Capstone Work", duration: "2 Hour(s)", startTime: "7:30 PM", endTime: "9:30 PM", location: "Info Lounge", notes: "Capstone Sucks" }];
		this.setState({events:events});
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