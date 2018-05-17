import React from 'react';
import Firebase from 'firebase';
import M from 'react-materialize';
import Materialize from 'materialize-css';

class AddEventPopup extends React.Component {

	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function() {
			var date = document.querySelectorAll('.datepicker');
			var instances = Materialize.Datepicker.init(date);
			var time = document.querySelectorAll('.timepicker');
			var instances = Materialize.Timepicker.init(time);
			var menu = document.querySelectorAll('select');
			var instances = Materialize.FormSelect.init(menu);
		});
	}

	render() {
		return (
			<div id='addevent-popup-content'>
			<span id='add-event-title'> Add Event </span>
				<div className='row' id='addevent-form'>
					<form className='col s12'>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='title' type='text' className='validate' />
								<label htmlFor='title' className='active'>Title</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s6'>
								<input id='date' type='text' className='datepicker' />
								<label htmlFor='date' className='active'>Date</label>
							</div>
							<div className='input-field col s6'>
								<select>
									<option value='1'>One Time</option>
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
								<input id='start' type='text' className='timepicker' />
								<label htmlFor='start' className='active'>Start</label>
							</div>
							<div className='input-field col s4'>
								<input id='end' type='text' className='timepicker' />
								<label htmlFor='end' className='active'>End</label>
							</div>
							<div className='input-field col s4'>
								<input id='duration' type='text' className='validate' />
								<label htmlFor='duration' className='active'>Duration</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='location' type='text' className='validate' />
								<label htmlFor='location' className='active'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='notes' type='text' className='validate' />
								<label htmlFor='notes' className='active'>Notes</label>
							</div>
						</div>
						
						<button className='btn waves-effect waves-light' type='submit' name='action'>Add to Calendar
							<i className='material-icons right'>send</i>
						</button>
					</form>
				</div>
		  
			</div>
		);
	}
}
 export default AddEventPopup;