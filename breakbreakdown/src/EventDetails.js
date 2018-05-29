import React from 'react';
import Materialize from 'materialize-css';
import ColorPalette from './ColorPalette';
import EventEdit from './EventEdit';
import $ from 'jquery';
import './eventdetails.css';


class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = { event: '' }
	}

	render() {
		return (			
			<div>
				<div className='row' id='event-form'>
					<form className='col s12'>
						<div className='row'>
							<div className='input-field col s11'>
								<input id='title' placeholder='' disabled value={this.props.event} type='text' className='validate' />
								<label htmlFor='title'>Title</label>
							</div>
							<div className='input-field col s1'>
								<label className='active'>Color</label>
								<ColorPalette />
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s6'>
								<input id='date' placeholder='' disabled value={this.props.event} type='text' type='text' className='validate' />
								<label htmlFor='date'>Date</label>
							</div>
							<div className='input-field col s6'>
								<input id='recurring' placeholder='' disabled value={this.props.event} type='text' type='text' className='validate' />
								<label htmlFor='date'>Recurring</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s4'>
								<input id='start' placeholder='' disabled value={this.props.startTime} type='text' type='text' className='validate' />
								<label htmlFor='start'>Start</label>
							</div>
							<div className='input-field col s4'>
								<input id='end' placeholder='' disabled value={this.props.endTime} type='text' type='text' className='validate' />
								<label htmlFor='end'>End</label>
							</div>
							<div className='input-field col s4'>
								<input id='duration' placeholder='' disabled value={this.props.duration} type='text' type='text' className='validate' />
								<label htmlFor='duration'>Duration</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='location' placeholder='' disabled value={this.props.location} type='text' type='text' className='validate' />
								<label htmlFor='location'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='notes' placeholder='' disabled value={this.props.notes} type='text' type='text' className='validate' />
								<label htmlFor='notes'>Notes</label>
							</div>
						</div>
						<a className="waves-effect waves-light btn modal-close" id='cancel-btn' >Close</a>
						<a className="waves-effect waves-light btn modal-trigger" href={'#event-edit-popup-' + this.props.index} id='edit-btn'>Edit</a>

					</form>
				</div>
			</div>
		);
	}
}
 export default EventDetails;