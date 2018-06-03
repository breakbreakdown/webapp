import React from 'react';
import Materialize from 'materialize-css';
import M from 'react-materialize';
import ColorPalette from './ColorPalette';
import $ from 'jquery';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/light.css';



class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: '', startTime: '', endTime: '' };
		this.setDefaultEndTime = this.setDefaultEndTime.bind(this);
		this.setDefaultDate = this.setDefaultDate.bind(this);
		this.resetTimes = this.resetTimes.bind(this);
		this.resetDuration = this.resetDuration.bind(this);
		this.setEndTime = this.setEndTime.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function () {
			var menu = document.querySelectorAll('select');
			var instances = Materialize.FormSelect.init(menu);
		});

		
		this.resetType();
	}

	resetType() {

		$('#edit-type-task').css('display', 'none');
	}

	setDefaultEndTime(dateStr) {
		if ($('#add-start').val() != '') {
			this.setState({ startTime: dateStr });
			console.log(this.state.startTime);
			const fp = flatpickr("#add-end", {
				enableTime: true,
				static: true,
				onClose: this.setEndTime,
				minDate: this.state.startTime[0],
			});
			var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			var timezone2 = dateStr[0].getTimezoneOffset();
			this.setState({ startTime: $('#add-start').val() });
			console.log(this.state.startTime.replace(" ", "T") + ':00' + timezone2);
		} else {
			console.log('empty')
		}
	}

	setEndTime(dateStr) {
		this.setState({ endTime: $('#edit-end').val() });
		console.log(this.state.endTime);
	}

	resetForm() {
		$('#edit-title').val('');
		$('#edit-location').val('');
		$('#edit-notes').val('');
		this.resetDate();
		this.resetTimes();
		this.resetDuration();
	}

	resetDate() {
		const fps = flatpickr("#edit-date", {
			static: true,
			onClose: this.setDefaultDate
		});
	}

	resetTimes() {
		const fps = flatpickr("#edit-start", {
			enableTime: true,
			static: true,
			onClose: this.setDefaultEndTime
		});

		const fpe = flatpickr("#edit-end", {
			enableTime: true,
			static: true,
			onClose: this.setEndTime
		});
	}

	resetDuration() {
		$("#edit-duration-hours").prop('selectedIndex', 0);
		$(".edit-duration .select-dropdown").val('');
		$('#edit-duration-minutes').val('0');
	}

	setDefaultDate(dateStr) {
		if ($('#edit-date').val() != '') {
			this.setState({ date: dateStr });
			console.log($('#edit-date').val());
		}
	}

	render() {
		console.log(this.props.colorIndex);
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
				<span id='edit-event-title'> Edit Event </span>

				<div className='row' id='edit-event-form'>
					<form className='col s12'>
						<div className='row'>
							<div className='input-field col s11'>
								<input id='edit-title' placeholder='' defaultValue={this.props.event} type='text' />
								<label htmlFor='edit-title'>Title</label>
							</div>
							<div className='input-field col s1'>
								<label className='active'>Color</label>
								<ColorPalette colorIndex = {this.props.colorIndex}/>
							</div>
						</div>

						<div className='row'>


							<div id='edit-type-event'>
								<div className='input-field col s4'>
									<label htmlFor='edit-start' className='active'>Start</label>
									<Flatpickr id='edit-start' options={{
										enableTime: true,
										static: true,
										onClose: this.setDefaultEndTime

									}} />
								</div>
								<div className='input-field col s4'>
									<label htmlFor='edit-end' className='active'>End</label>
									<Flatpickr id='edit-end' options={{
										enableTime: true,
										static: true,
										onChange: this.setEndTime
									}} />
								</div>
							</div>

							<div id='edit-type-task'>
								<div className='input-field col s3'>
									<label htmlFor='edit-date' className='active'>Date</label>
									<Flatpickr id='edit-date' options={{
										static: true,
										onClose: this.setDefaultDate
									}} />
								</div>
								<div id='edit-duration'>
									<div className='input-field col s3'>
										<select id="edit-duration-hours">
											<option value='0' selected></option>
											{hours}
										</select>
										<label>Hours</label>
									</div>
									<div className='input-field col s3'>
										<select id="edit-duration-minutes">
											<option value='0' selected></option>
											{minutes}
										</select>
										<label>Minutes</label>
									</div>
								</div>
							</div>

							<div className='input-field col s4' id='edit-recurring'>
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
								<input id='edit-location' placeholder='' defaultValue={this.props.location} type='text' />
								<label htmlFor='edit-location'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='edit-notes' placeholder='' defaultValue={this.props.notes} type='text' />
								<label htmlFor='edit-notes'>Notes</label>
							</div>
						</div>

						<a className="waves-effect waves-light btn modal-close" id='cancel-btn' onClick={this.resetForm}>Cancel</a>

						<button className='btn waves-effect waves-light' type='submit' >Save
						</button>
					</form>
				</div>
			</div>
		);
	}
}
export default EventDetails;