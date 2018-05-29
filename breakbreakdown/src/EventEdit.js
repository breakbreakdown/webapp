import React from 'react';
import Materialize from 'materialize-css';
import M from 'react-materialize';
import ColorPalette from './ColorPalette';
import $ from 'jquery';



class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = { event:''}
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

	}

	asdf() {
		//document.getElementById("edit-event-form").reset();
	}

	render() {
		return (			
			<div>
				<div className='row' id='event-form'>
					<form id='edit-event-form' className='col s12'>
						<div className='row'>
							<div className='input-field col s11'>
								<input id='title-edit' placeholder='' defaultValue={this.props.event} type='text' />
								<label htmlFor='title'>Title</label>
							</div>
							<div className='input-field col s1'>
								<label className='active'>Color</label>
								<ColorPalette />
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s6'>
								<input id='date-edit' placeholder='' defaultValue={this.props.event} type='text' type='text' className='datepicker' />
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
								<input id='start-edit' placeholder='' defaultValue={this.props.event} type='text' type='text' className='timepicker' />
								<label htmlFor='start'>Start</label>
							</div>
							<div className='input-field col s4'>
								<input id='end-edit' placeholder='' defaultValue={this.props.event} type='text' type='text' className='timepicker' />
								<label htmlFor='end'>End</label>
							</div>
							<div className='input-field col s4'>
								<input id='duration-edit' placeholder='' defaultValue={this.props.event} type='text' type='text' />
								<label htmlFor='duration'>Duration</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='location-edit' placeholder='' defaultValue={this.props.event} type='text' type='text' />
								<label htmlFor='location'>Location</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input id='notes-edit' placeholder='' defaultValue={this.props.event} type='text' type='text' />
								<label htmlFor='notes'>Notes</label>
							</div>
						</div>
						<a className="waves-effect waves-light btn modal-close" id='cancel-btn' onClick={this.asdf}>Cancel</a>
						<a className="waves-effect waves-light btn modal-close" id='cancel-btn'>Save</a>
						<input type='reset' value='Reset' name='reset' onClick="return resetForm(this.form);" />

					</form>
				</div>
			</div>
		);
	}
}
 export default EventDetails;