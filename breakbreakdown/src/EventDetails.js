import React from 'react';
import Materialize from 'materialize-css';
import ColorPalette from './ColorPalette';
import EventEdit from './EventEdit';
import $ from 'jquery';
import './eventdetails.css';


class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {title:''}
	}
	
	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function() {
			var menu = document.querySelectorAll('select');
			var instances = Materialize.FormSelect.init(menu);
		});
		
		$('#start').defaultValue
	}
	
    setEventInfo() {
		$('#title').val(this.props.title);
		$('#date').val(this.props.title);
		$('#recurring').val(this.props.title);
		$('#start').val(this.props.title);
		$('#end').val(this.props.title);
		$('#duration').val(this.props.title);
		$('#location').val(this.props.title);
        $('#notes').val(this.props.title);
	}
	
	editEvent() {
		console.log("hello");
	}

	render() {
		this.setEventInfo();
		return (			
			<div>
			<span id='event-details-title'> {} </span>
				<div className='row' id='addevent-form'>
					<form className='col s12'>
						<div className='row'>
							<div className='input-field col s11'>
								<input id='title' placeholder='' disabled value='' type='text' className='validate' />
								<label htmlFor='title'>Title</label>
							</div>
							<div className='input-field col s1'>
								<label className='active'>Color</label>
								<ColorPalette />
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s6'>
								<input id='date' placeholder='' disabled value='' type='text' type='text' className='validate' />
								<label htmlFor='date'>Date</label>
							</div>
							<div className='input-field col s6'>
								<input id='recurring' placeholder='' disabled value='' type='text' type='text' className='validate' />
								<label htmlFor='date'>Recurring</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s4'>
								<input id='start' placeholder='' disabled value='' type='text' type='text' className='validate' />
								<label htmlFor='start'>Start</label>
							</div>
							<div className='input-field col s4'>
								<input id='end' placeholder='' disabled value='' type='text' type='text' className='validate' />
								<label htmlFor='end'>End</label>
							</div>
							<div className='input-field col s4'>
								<input id='duration' placeholder='' disabled value='' type='text' type='text' className='validate' />
								<label htmlFor='duration'>Duration</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='location' placeholder='' disabled value='' type='text' type='text' className='validate' />
								<label htmlFor='location'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='notes' placeholder='' disabled value='' type='text' type='text' className='validate' />
								<label htmlFor='notes'>Notes</label>
							</div>
						</div>
						<a className="waves-effect waves-light btn modal-close" id='cancel-btn' >Close</a>
						<a className="waves-effect waves-light btn modal-trigger" href='#event-edit-popup' id='edit-btn'>Edit</a>

					</form>
				</div>
			</div>
		);
	}
}
 export default EventDetails;