import React from 'react';
import Materialize from 'materialize-css';
import ColorPalette from './ColorPalette';
import $ from 'jquery';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/light.css';

class AddEventPopup extends React.Component {

	constructor(props) {
		super(props);
		this.state = { date:'', startTime: '' };
		this.setDefaultEndTime = this.setDefaultEndTime.bind(this);
		this.setDefaultDate = this.setDefaultDate.bind(this);
		this.setEventType = this.setEventType.bind(this);
		this.resetTimes = this.resetTimes.bind(this);
		this.resetDuration = this.resetDuration.bind(this);
	}

	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function () {
			var date = document.querySelectorAll('.datepicker');
			var instances = Materialize.Datepicker.init(date);
			var time = document.querySelectorAll('.timepicker');
			var instances = Materialize.Timepicker.init(time);
			var menu = document.querySelectorAll('select');
			var instances = Materialize.FormSelect.init(menu);
		});

		this.resetForm = this.resetForm.bind(this);
		this.setEventType()
	}

	resetForm() {
		$('#add-title').val('');
		$('#add-date').val('');
		$('#add-start').val('');
		$('#add-end').val('');
		$('#add-duration').val('');
		$('#add-location').val('');
		$('#add-notes').val('');
	}

	setDefaultEndTime(dateStr) {
		this.setState({ startTime: dateStr });
		console.log(this.state.startTime);
		const fp = flatpickr("#add-end", {
			enableTime: true,
			static: true,
			altInput: true,
			noCalendar: true,
			minTime: this.state.startTime[0],
			defaultDate: this.state.startTime[0]
		});
	}

	resetTimes() {
		const fps = flatpickr("#add-start", {
			enableTime: true,
			static: true,
			altInput: true,
			noCalendar: true,
			onClose: this.setDefaultEndTime
		});

		const fpe = flatpickr("#add-end", {
			enableTime: true,
			static: true,
			altInput: true,
			noCalendar: true,
		});
	}

	resetDuration() {
		$("#duration-hours").prop('selectedIndex', 0);
		$(".add-duration .select-dropdown").val('');
		$('#duration-minutes').val('0');
	}

	setDefaultDate(dateStr) {
		this.setState({ date: dateStr });
		console.log(this.state.date);
	}

	setEventType() {
		var checkbox = document.getElementById('event-switch');
		if (checkbox.checked) {
			$('#type-event').css('display', 'none');
			$('#type-task').css('display', 'block');
			this.resetTimes();
		} else {
			$('#type-event').css('display', 'block');
			$('#type-task').css('display', 'none');
			this.resetDuration();
		}
	}

	render() {
		var hours = [];
		for (var i = 1; i < 24; i++) {
			hours.push(<option value={i}>{i}</option>);
		}

		var minutes = [];
		for (var i = 1; i < 60; i++) {
			minutes.push(<option value={i}>{i}</option>);
		}
		return (
			<div>
				

					<span id='add-event-title'> Add Event </span>
					<div className="switch" id='event-type'>
						<label>
							Event
							<input type="checkbox" id='event-switch' onChange={this.setEventType} data-clear/>
							<span className="lever"></span>
							Task
							</label>
					</div>
	
				<div className='row' id='addevent-form'>
					<form className='col s12'>
						<div className='row'>
							<div className='input-field col s11'>
								<input id='add-title' placeholder='' type='text'/>
								<label htmlFor='add-title'>Title</label>
							</div>
							<div className='input-field col s1'>
								<label className='active'>Color</label>
								<ColorPalette />
							</div>
						</div>

						<div className='row'>
							<div className='input-field col s3'>
								<label htmlFor='add-date' className='active'>Date</label>
								<Flatpickr id='add-date' options={{
									static: true,
									altInput: true,
									onClose: this.setDefaultDate
								}} />
							</div>
							<div id='type-event'>
								<div className='input-field col s3'>
									<label htmlFor='add-start' className='active'>Start</label>
									<Flatpickr id='add-start' options={{
										enableTime: true,
										static: true,
										altInput: true,
										noCalendar: true,
										onClose: this.setDefaultEndTime
									
									}} />
								</div>
								<div className='input-field col s3'>
									<label htmlFor='add-end' className='active'>End</label>
									<Flatpickr id='add-end' options={{
										enableTime: true,
										static: true,
										altInput: true,
										noCalendar: true,
									}} />
								</div>
							</div>

							<div id='type-task'>
								<div id='add-duration'>
									<div className='input-field col s3'>
										<select id="duration-hours">
											<option value='0' selected></option>
											{hours}
										</select>
										<label>Hours</label>
									</div>
									<div className='input-field col s3'>
										<select id="duration-minutes">
											<option value='0' selected></option>
											{minutes}
										</select>
										<label>Minutes</label>
									</div>
								</div>
							</div>

							<div className='input-field col s3' id='add-recurring'>
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
							<div className='input-field col s12'>
								<input id='add-location' placeholder='' type='text' />
								<label htmlFor='add-location'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='add-notes' placeholder='' type='text' />
								<label htmlFor='add-notes'>Notes</label>
							</div>
						</div>
						
						<a className="waves-effect waves-light btn modal-close" id='cancel-btn' onClick={this.resetForm}>Cancel</a>
						
						<button className='btn waves-effect waves-light' type='submit' >Add to Calendar
							<i className='material-icons right'>send</i>
						</button>
					</form>
				</div>
			</div>
		);
	}
}
 export default AddEventPopup;