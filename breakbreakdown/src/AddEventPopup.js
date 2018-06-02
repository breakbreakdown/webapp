import React from 'react';
import Materialize from 'materialize-css';
import ColorPalette from './ColorPalette';
import ApiCalendar from './ApiCalendar.js';
import fire from './fireB.js';

var database = fire.database();

//path to user
var databaseRef = database.ref('users/' + localStorage.getItem('appTokenKey'));

class AddEventPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            colorID: '',
            location: '',
            startTime: '',
            endTime: '',
            recurrence: '',
            notes: '',
            duration: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.id });
    }

    createEvent() {
        let eventIdReturn;
        console.log("button clicked")
        ApiCalendar.handleAuthClick();
        var signChanged = function (val) {
            if (val) {
                console.log("About to call createEvent");
                eventIdReturn = ApiCalendar.createEvent('name', 'location', 'notes', '5', 'startTime', 'endTime', 'recurrence');
                console.log(eventIdReturn);
				ApiCalendar.handleSignoutClick();
            }
        };
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



    componentDidMount() {
        // ApiCalendar.handleAuthClick();
        // var signChanged = function (val) {
        //     if (val) {
        //         // ApiCalendar.createEvent('name', 'location', 'notes', '5', 'startTime', 'endTime', 'recurrence');
        //     }
        // };
        // ApiCalendar.listenSign(signChanged);

        document.addEventListener('DOMContentLoaded', function () {
            var date = document.querySelectorAll('.datepicker');
            var instances = Materialize.Datepicker.init(date);
            var time = document.querySelectorAll('.timepicker');
            var instances = Materialize.Timepicker.init(time);
            var menu = document.querySelectorAll('select');
            var instances = Materialize.FormSelect.init(menu);
        });
        //// OPTIMIZE:this.createEvent();
        //ApiCalendar.createEvent('name', 'location', 'notes', '5', 'startTime', 'endTime', 'recurrence');

    }

    render() {
        return (
            <div>
                <span id='add-event-title'> Add Event </span>
                <div className='row' id='addevent-form'>
                    <form className='col s12' >
                        <div className='row'>
                            <div className='input-field col s11'>
                                <input id='title' placeholder='' type='text' />
                                <label htmlFor='title'>Title</label>
                            </div>
                            <div className='input-field col s1'>
                                <label className='active'>Color</label>
                                <ColorPalette />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s6'>
                                <input id='date' placeholder='' type='text' className='datepicker' onChange={this.handleChange} />
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
                                <input id='start' placeholder='' type='text' className='timepicker' onChange={this.handleChange} />
                                <label htmlFor='start'>Start</label>
                            </div>
                            <div className='input-field col s4'>
                                <input id='end' placeholder='' type='text' className='timepicker' onChange={this.handleChange} />
                                <label htmlFor='end'>End</label>
                            </div>
                            <div className='input-field col s4'>
                                <input id='duration' placeholder='' type='text' className='validate' onChange={this.handleChange} />
                                <label htmlFor='duration'>Duration</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input id='location' placeholder='' type='text' className='validate' onChange={this.handleChange} />
                                <label htmlFor='location'>Location</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input id='notes' placeholder='' type='text' className='validate' onChange={this.handleChange} />
                                <label htmlFor='notes'>Notes</label>
                            </div>
                        </div>

                        <a className="waves-effect waves-light btn modal-close" id='cancel-btn'>Cancel</a>

                        <button onClick={() => {this.createEvent()}} className='btn waves-effect waves-light' type='submit'>Add to Calendar
							<i className='material-icons right'>send</i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddEventPopup;
