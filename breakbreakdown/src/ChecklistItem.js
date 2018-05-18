import React from 'react';
import EventDetails from './EventDetails';

class ChecklistItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {title:''}
		this.setTitle = this.setTitle.bind(this);
	}
	
	
	setTitle() {
		this.setState({title: this.props.title});
	}
	
	render() {
		return (
			<li className='collection-item'>
				<label>
					<input type='checkbox' className='checkbox'/>
					<span className='event-title'>{this.props.title}</span>
				</label>
				<div className='checklist-event modal-trigger' href='#event-details-popup' onClick={this.setTitle}></div>
				<div id='event-details-popup' className='modal'>
					<div className='modal-content'>
						<EventDetails title={this.state.title}/>
					</div>
				</div>
			</li>
		);
	}
}
 export default ChecklistItem;