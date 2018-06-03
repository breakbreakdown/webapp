import React from 'react';
import EventDetails from './EventDetails';
import EventEdit from './EventEdit';

class ChecklistItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currEvent:[]}
	}

	render() {
		return (
			<li className='collection-item'>
				<label>
					<input type='checkbox' className='checkbox'/>
					<span className='event-title'>{this.props.currEvent.label}</span>
				</label>
				<div className='checklist-event modal-trigger' href={'#event-details-popup-' + this.props.index}>
					<div className='checklist-event-color'></div>
				</div>
				<div id={'event-details-popup-' + this.props.index} className='modal event-details-popup'>
					<div className='modal-content'>
						<EventDetails event={this.props.currEvent.label} duration={this.props.currEvent.duration} startTime={this.props.currEvent.startTime}
							endTime={this.props.currEvent.endTime} location={this.props.currEvent.location} notes={this.props.currEvent.notes} index={this.props.index}/>
					</div>
				</div>
				<div id={'event-edit-popup-' + this.props.index} className='modal event-edit-popup'>
					<div className='modal-content'>
						<EventEdit event={this.props.currEvent.label} duration={this.props.currEvent.duration} startTime={this.props.currEvent.startTime}
							endTime={this.props.currEvent.endTime} location={this.props.currEvent.location} notes={this.props.currEvent.notes}/>
					</div>
				</div>
			</li>
		);
	}
}
 export default ChecklistItem;