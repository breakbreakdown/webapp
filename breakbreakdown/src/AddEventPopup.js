import React from 'react';
import ApiCalendar from './ApiCalendar.js';
import Materialize from 'materialize-css';
import ColorPalette from './ColorPalette';
import $ from 'jquery';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/light.css';
import fire from './fireB.js';

var database = fire.database();
var submitClicked = false;

class AddEventPopup extends React.Component {

	constructor(props) {
		super(props);
		this.state = { date:'',
						title: '', // Works
						colorID: '', // No
						location: '', // Works
						start: '', // No
						end: '', // No
						recurrence: '', // No
						notes: '', // Works
						duration: '', // No };
						hours: '',
						minutes: ''
				}
		this.setDefaultEndTime = this.setDefaultEndTime.bind(this);
		this.setDefaultDate = this.setDefaultDate.bind(this);
		this.setEventType = this.setEventType.bind(this);
		this.resetTimes = this.resetTimes.bind(this);
		this.resetDuration = this.resetDuration.bind(this);
		this.setEndTime = this.setEndTime.bind(this);
		this.createEvent = this.createEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
<<<<<<< HEAD
		this.setDurationHours = this.setDurationHours.bind(this);
		this.setDurationMinutes = this.setDurationMinutes.bind(this);
		this.test = this.test.bind(this);
=======
		this.getColor = this.getColor.bind(this);
>>>>>>> b0a62198d0043f88aa1e2b62aba554b2e918d9f9
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
		this.setEventType();
<<<<<<< HEAD
		this.setState({recurrence: '1', hours: '0', minutes: '0'});
	}
=======
		this.setState({recurrence: '1'});
	}

>>>>>>> b0a62198d0043f88aa1e2b62aba554b2e918d9f9
	
	handleChange(evt) {
        this.setState({ [evt.target.id.split('-')[1]]: evt.target.value });
		console.log(evt.target.value);
		console.log(this.state.recurrence);
	}


	createEvent(e) {

		//return new Promise(function (resolve, reject) {
		//	request.execute(function (resp) {
		//		var events = resp.items;
		//		if (events.length > 0) {
		//			for (let i = 0; i < events.length; i++) {
		//				let event = events[i];
		//				myEvents[i] = {
		//					eventName: event.summary,
		//					colorId: event.colorId,
		//					duration: '30',
		//					startTime: event.start["dateTime"],
		//					endTime: event.end["dateTime"],
		//					location: event.location,
		//					notes: event.description,
		//					eventId: event.id
		//				};

		//			}
		//		} else {
		//			myEvents = null;
		//		}
		//		resolve(myEvents);
		//	});
		//});

		e.preventDefault();
		if (!$('#event-switch').prop('checked') && ($('#add-start').val() == "" || $('#add-end').val() == "")) {
			alert("Please enter start and end time before adding event.");
		} else if ($('#event-switch').prop('checked') && (this.state.hours == '0' && this.state.minutes == '0') || this.state.date == '') {
			if (this.state.hours == '0' && this.state.minutes == '0') {
				alert("Please enter duration before adding task.");
			}
			if (this.state.date == '') {
				alert("Please enter date before adding task.");
			}

		} else {
			let eventIdReturn;
			console.log("button clicked");
			ApiCalendar.handleAuthClick();
			console.log('AUTHENTICATED');
			var alreadyPushed = false;
			var signChanged = function (val) {
				console.log("Signed in:", val);
				if (val) {
					console.log("About to call createEvent");
					if (!alreadyPushed) {
						console.log(this.state.recurrence);
						if (this.state.recurrence == 1) {
							this.state.recurrence = "RRULE:FREQ=DAILY;COUNT=1";
							console.log('triggered1');
						} else {
							this.state.recurrence = 'RRULE:FREQ=' + this.state.recurrence + ';';
							console.log(this.state.recurrence);
						}
						eventIdReturn = ApiCalendar.createEvent(this.state.title, this.state.location, this.state.notes, '5', this.state.start, this.state.end, this.state.recurrence);
						alreadyPushed = true;

						//tasks
						if ($('#event-switch').prop('checked')) {
							var date = new Date();
							var month = date.getMonth() + 1; //months from 1-12
							var day = date.getDate();
							var year = date.getFullYear();
							var newDate = year + "-" + month + "-" + day;
							var usersRef = database.ref('users/' + localStorage.getItem('appTokenKey') + '/days/' + newDate);

							var eventName = this.state.title || "Unnamed Event";
							var colorId = this.state.colorId || "12";
							var location = this.state.location || "";
							var notes = this.state.notes || "";

							var durHr = parseFloat(this.state.hours);
							var durMin = parseFloat(this.state.minutes) / 60;
							var totalTime = durHr + durMin;
							

							var m = this.state.date[0].getMonth() + 1; //months from 1-12
							var d = this.state.date[0].getDate();
							var y = this.state.date[0].getFullYear();
							var taskDate = y + "-" + m + "-" + d;

							var taskData = {
								eventName: eventName,
								date: taskDate,
								colorId: colorId,
								duration: this.state.hours + 'hr ' + this.state.minutes + 'min',
								location: location,
								notes: notes,
								completed: false,
								y: totalTime || "",
								type: 'Task'
							};
							console.log(taskData);
							console.log(usersRef);
							usersRef.child("" + localStorage.getItem('appTokenKey') + Date.now()).update(taskData);
						}
					}

					eventIdReturn = ApiCalendar.createEvent(this.state.title, this.state.location, this.state.notes, (this.state.colorID + 1) || "1", this.state.start, this.state.end, this.state.recurrence);
                  alreadyPushed = true;
                }
                console.log(eventIdReturn);
                ApiCalendar.handleSignoutClick();
            }
        }.bind(this);
        ApiCalendar.listenSign(signChanged);
        // var updates = {};
        //
        // //PUT EVERYTHING BELOW HERE IN A FOR LOOP ONCE WE FIGURE OUT HOW TO DO THE LOCAL EVENT OBJECT
        //
        // var duration = this.duration;

        // //An event entry.
        // //USE THIS ONE FOR SENDING REAL DATA
        // var eventData = {
        //   duration: duration
        // };
        //
        // // Get a key for a new event.
        // //Once we get eventID from google we will use Authorization instead of 'i'
        // var newPostKey = databaseRef.ref.child('' + 'event ID from google here').key;
        //
        // // //adds the event with data into updates array
        // updates['/days/' + this.date + '/' + newPostKey] = eventData;
        //
        // //pushes updates to firebase
        // return database.ref('users/' + localStorage.getItem('appTokenKey')).update(updates);
        // console.log('event data pushed');

    }
	
	setDefaultEndTime(dateStr) {
		if ($('#add-start').val() != '') {
			this.setState({ start: dateStr });
			console.log(this.state.start);
			const fp = flatpickr("#add-end", {
				enableTime: true,
				static: true,
				onClose: this.setEndTime,
				minDate: this.state.start[0],
			});
			var timezone = parseInt(this.state.start[0].getTimezoneOffset()) / 60;
			var startFormat = $('#add-start').val().replace(" ", "T") + ':00-0' + timezone + ':00';
			var startDate = new Date(startFormat).toISOString() + "";
			this.setState({ start: startDate });
			console.log(startDate);
		} else {
		console.log('empty')}
		
	}

	setEndTime(dateStr) {
		if ($('#add-end').val() != '') {
			var timezone = parseInt(dateStr[0].getTimezoneOffset()) / 60;
			var endFormat = $('#add-end').val().replace(" ", "T") + ':00-0' + timezone + ':00';;
			var endDate = new Date(endFormat).toISOString() + "";
			this.setState({ end: endDate });
			console.log(this.state.end);
		} else {
			console.log('empty')
		}
	}

	resetForm() {
		$('#add-title').val('');
		$('#add-location').val('');
		$('#add-notes').val('');
		this.resetDate();
		this.resetTimes();
		this.resetDuration();
		this.resetType();
	}

	resetType() {
		$('#event-switch').prop('checked', false);
		$('#add-type-event').css('display', 'block');
		$('#add-type-task').css('display', 'none');
	}

	resetDate() {
		const fps = flatpickr("#add-date", {
			static: true,
			onClose: this.setDefaultDate
		});
	}

	resetTimes() {
		const fps = flatpickr("#add-start", {
			enableTime: true,
			static: true,
			onClose: this.setDefaultEndTime
		});

		const fpe = flatpickr("#add-end", {
			enableTime: true,
			static: true,
			onClose: this.setEndTime
		});
	}

	resetDuration() {
		$("#duration-hours").prop('selectedIndex', 0);
		$(".add-duration .select-dropdown").val('');
		$('#duration-minutes').val('0');
		this.resetDate();
	}

	setDefaultDate(dateStr) {
		this.setState({ date: dateStr });
		console.log($('#add-date').val());
	}

	setEventType() {
		var checkbox = document.getElementById('event-switch');
		if (checkbox.checked) {
			$('#add-type-event').css('display', 'none');
			$('#add-type-task').css('display', 'block');
			$('#add-recurring').addClass('s3');
			$('#add-recurring').removeClass('s4');

			this.resetTimes();
			console.log('task');
		} else {
			$('#add-type-event').css('display', 'block');
			$('#add-type-task').css('display', 'none');
			this.resetDuration();
			$('#add-recurring').addClass('s4');
			$('#add-recurring').removeClass('s3');
			console.log('event');
		}
	}

<<<<<<< HEAD
	setDurationHours(evt) {
		this.setState({ hours: evt.target.value });
	}

	setDurationMinutes(evt) {
		this.setState({ minutes: evt.target.value });
	}

	test() {
		console.log($('#event-switch').prop('checked'));
		console.log(this.state.hours);
		console.log(this.state.minutes);
	}

=======
	getColor(value) {
		let colors = ['#7986cb', '#33b679', '#8e24aa', '#e67c73', '#f6c026', '#f5511d', '#039be5', '#616161', '#3f51b5', '#0b8043', '#d60000', '#5484ed'];
		this.setState({colorID: colors.indexOf(value)});
	}
	
>>>>>>> b0a62198d0043f88aa1e2b62aba554b2e918d9f9
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
							<input type="checkbox" id='event-switch' onChange={this.setEventType}/>
							<span className="lever"></span>
							Task
							</label>
					</div>
	
				<div className='row' id='addevent-form'>
					<form className='col s12'>
						<div className='row'>
							<div className='input-field col s11'>
								<input id='add-title' placeholder='' type='text' onChange={this.handleChange}/>
								<label htmlFor='add-title'>Title</label>
							</div>
							<div className='input-field col s1' onChange={this.handleChange}>
								<label className='active'>Color</label>
								<ColorPalette sendColor = {this.getColor} />
							</div>
						</div>

						<div className='row'>
						

							<div id='add-type-event'>
								<div className='input-field col s4'>
									<label htmlFor='add-start' className='active'>Start</label>
									<Flatpickr id='add-start' options={{
										enableTime: true,
										static: true,
										onClose: this.setDefaultEndTime
									
									}} />
								</div>
								<div className='input-field col s4'>
									<label htmlFor='add-end' className='active'>End</label>
									<Flatpickr id='add-end' options={{
										enableTime: true,
										static: true,
										onChange: this.setEndTime
									}} />
								</div>
							</div>

							<div id='add-type-task'>
								<div className='input-field col s3'>
									<label htmlFor='add-date' className='active'>Date</label>
									<Flatpickr id='add-date' options={{
										static: true,
										onClose: this.setDefaultDate
									}} />
								</div>
								<div id='add-duration'>
									<div className='input-field col s3'>
										<select id="duration-hours" onChange={this.setDurationHours}>
											<option value='0' selected></option>
											{hours}
										</select>
										<label>Hours</label>
									</div>
									<div className='input-field col s3'>
										<select id="duration-minutes" onChange={this.setDurationMinutes}>
											<option value='0' selected></option>
											{minutes}
										</select>
										<label>Minutes</label>
									</div>
								</div>
							</div>

							<div className='input-field col s3'>
								<select id='add-recurrence' onChange={this.handleChange}>
									<option value='1'></option>
									<option value='DAILY'>Daily</option>
									<option value='WEEKLY'>Weekly</option>
									<option value='MONTHLY'>Monthly</option>
									<option value='YEARLY'>Yearly</option>
								</select>
								<label>Recurrence</label>
							</div>
						</div>

						<div className='row'>
							<div className='input-field col s12'>
								<input id='add-location' placeholder='' type='text' onChange={this.handleChange}/>
								<label htmlFor='add-location'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='add-notes' placeholder='' type='text' onChange={this.handleChange}/>
								<label htmlFor='add-notes'>Notes</label>
							</div>
						</div>
						
						<a className="waves-effect waves-light btn modal-close" id='cancel-btn' onClick={this.resetForm}>Cancel</a>
						<a className="waves-effect waves-light btn" id='cancel-btn' onClick={this.test}>test</a>
						
						<button onClick={(e) => { this.createEvent(e) }} className='btn waves-effect waves-light' type='submit'>Add to Calendar
							<i className='material-icons right'>send</i>
                        </button>
					</form>
				</div>
			</div>
		);
	}
}
 export default AddEventPopup;