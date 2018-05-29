import React from 'react';
import Materialize from 'materialize-css';
import ColorPalette from './ColorPalette';
import $ from 'jquery';


class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {title:''}
	}
	
	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function() {
			var date = document.querySelectorAll('.datepicker');
			var instances = Materialize.Datepicker.init(date);
			var time = document.querySelectorAll('.timepicker');
			var instances = Materialize.Timepicker.init(time);
			var menu = document.querySelectorAll('select');
			var instances = Materialize.FormSelect.init(menu);
		});
		
		$('#start').defaultValue
	}
	
	changeEventTitle() {
		$('#event-details-title').text(this.props.title);
	}
	
	editEvent() {
		console.log("hello");
	}

	render() {
		this.changeEventTitle();
		return (			
			<div>
			<span id='event-details-title'> {} </span>
				<div className='row' id='addevent-form'>
					<form className='col s12'>
						<div className='row'>
							<div className='input-field col s11'>
								<input id='title' placeholder='' value='' type='text' className='validate' />
								<label htmlFor='title'>Title</label>
							</div>
							<div className='input-field col s1'>
								<label className='active'>Color</label>
								<ColorPalette />
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s6'>
								<input id='date' placeholder='' type='text' type='text' className='datepicker' />
								<label htmlFor='date'>Date</label>
							</div>
							<div className='input-field col s6'>
								<select>
									<option value='1'></option>
									<option value='2'>Daily</option>
									<option value='3'>Weekly</option>
									<option value='4'>Monthly</option>
									<option value='5'>Yearly</option>
								</select>
								<label>Recurring</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s4'>
								<input id='start' placeholder='' type='text' type='text' className='timepicker' />
								<label htmlFor='start'>Start</label>
							</div>
							<div className='input-field col s4'>
								<input id='end' placeholder='' type='text' type='text' className='timepicker' />
								<label htmlFor='end'>End</label>
							</div>
							<div className='input-field col s4'>
								<input id='duration' placeholder='' type='text' type='text' className='validate' />
								<label htmlFor='duration'>Duration</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='location' placeholder='' type='text' type='text' className='validate' />
								<label htmlFor='location'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='notes' placeholder='' type='text' type='text' className='validate' />
								<label htmlFor='notes'>Notes</label>
							</div>
						</div>
						
						<a className="waves-effect waves-light btn" id='edit-btn' onClick={this.editEvent}>Edit</a>

					</form>
				</div>
			</div>
		);
	}
}
 export default EventDetails;