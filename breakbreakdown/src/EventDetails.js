import React from 'react';
import Materialize from 'materialize-css';
import ColorPalette from './ColorPalette';
import EventEdit from './EventEdit';
import $ from 'jquery';
import './eventdetails.css';


class EventDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setEventType();
	}

	setEventType() {
		var checkbox = document.getElementById('details-type-switch');
		if (checkbox.checked) {
			$('#details-type-event').css('display', 'none');
			$('#details-type-task').css('display', 'block');
			console.log('task');
		} else {
			$('#details-type-event').css('display', 'block');
			$('#details-type-task').css('display', 'none');
			console.log('event');
		}
	}

	render() {
		var startDatetime = new Date(this.props.startTime);
		var endDatetime = new Date(this.props.endTime);
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var day = startDatetime.getDate().toString();
		var month = months[startDatetime.getMonth()];
		var year = startDatetime.getFullYear().toString();
		var date = month + ' ' + day + ', ' + year;
		var starttime = startDatetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		var endtime = endDatetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		return (			
			<div>
				<div id='event-details-header'>
				<span id='add-event-title'>Event Details</span>
				<div className="switch" id='details-event-type'>
					<label>
						Event
							<input type="checkbox" disabled id='details-type-switch' onChange={this.setEventType} />
						<span className="lever"></span>
						Task
							</label>
					</div>
					</div>
				<div className='row' id='event-form'>

					<form className='col s12'>
						<div className='row'>
							<div className='input-field col s11'>
								<input id='title' placeholder='' disabled value={this.props.event} type='text'/>
								<label htmlFor='title'>Title</label>
							</div>
							<div className='input-field col s1'>
								<label className='active'>Color</label>
								<div id='color'></div>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s3'>
								<input id='date' placeholder='' disabled value={date} type='text' />
							<label htmlFor='date'>Date</label>
						</div>
							<div id='details-type-event'>
							<div className='input-field col s3'>
								<input id='start' placeholder='' disabled value={starttime} type='text' />
								<label htmlFor='start'>Start</label>
							</div>
							<div className='input-field col s3'>
								<input id='end' placeholder='' disabled value={endtime} type='text' />
								<label htmlFor='end'>End</label>
							</div>
							</div>
							<div id='details-type-task'>
							<div className='input-field col s3'>
								<input id='duration-hours' placeholder='' disabled value={this.props.event} type='text' />
								<label htmlFor='duration-hours'>Hours</label>
							</div>
						<div className='input-field col s3'>
								<input id='duration-minutes' placeholder='' disabled value={this.props.event} type='text' />
								<label htmlFor='duration-minutes'>Minutes</label>
							</div>
							</div>
							<div className='input-field col s3'>
								<input id='recurring' placeholder='' disabled value={this.props.event} type='text' />
								<label htmlFor='recurring'>Recurring</label>
							</div>
							
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='location' placeholder='' disabled value={this.props.location} type='text' />
								<label htmlFor='location'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='notes' placeholder='' disabled value={this.props.notes} type='text' />
								<label htmlFor='notes'>Notes</label>
							</div>
						</div>
						<a className="waves-effect waves-light btn modal-close" id='cancel-btn' >Close</a>
						<a className="waves-effect waves-light btn modal-close modal-trigger" href={'#event-edit-popup-' + this.props.index} id='edit-btn'>Edit</a>

					</form>
				</div>
			</div>
		);
	}
}
 export default EventDetails;