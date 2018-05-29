import React from 'react';
import Firebase from 'firebase';
import Materialize from 'materialize-css';
import './checklist.css';
import ChecklistItem from './ChecklistItem'
import EventDetails from './EventDetails';


class Checklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {listItems:[]}
	}
	
	componentDidMount(){
		var events = ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5', 'Event 6', 'Event 7']
		this.setState({listItems:events});
	}
	
	render() {
		return (
			<div id='checklist'>
			
				<span id='checklist-title'> Checklist </span>
			
				<ul className='collection'>
					{Object.keys(this.state.listItems).map((d) => {
						return <ChecklistItem key={d} index={d} event={this.state.listItems[d]}/>
					})}
				</ul>
				
        
			</div>
		);
	}
}
 export default Checklist;