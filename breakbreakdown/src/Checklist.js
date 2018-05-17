import React from 'react';
import Firebase from 'firebase';
import M from 'react-materialize';
import Materialize from 'materialize-css';
import './checklist.css';
import ChecklistItem from './ChecklistItem'


class Checklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {listItems:[]}
	}
	
	componentDidMount(){
		this.setState({listItems:['Event 1', 'Event 2', 'Event 3']});
	}
	
	render() {
		return (
			<div id='checklist'>
			
				<span id='checklist-title'> Checklist </span>
			
				<ul className='collection'>
					{Object.keys(this.state.listItems).map((d) => {
							return <ChecklistItem title={this.state.listItems[d]}/>
					})}
				</ul>
				
        
			</div>
		);
	}
}
 export default Checklist;