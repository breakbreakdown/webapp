import React from 'react';
import './addevent.css'
import AddEventPopup from './AddEventPopup';
import Popup from 'reactjs-popup';
import $ from 'jquery';
import Materialize from 'materialize-css';


class AddEvent extends React.Component {
	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function() {
		var elems = document.querySelectorAll('.modal');
		var instances = Materialize.Modal.init(elems);
		});
        
	}

	render() {
		return (
			<div id='addevent'>
				<span id='add-event-title'> Add Event </span>
				<a className='waves-effect waves-light btn modal-trigger' id='add-event-btn' href='#add-event-popup'><i className="material-icons">add</i></a>
				<div id='add-event-popup' className='modal'>
					<div className='modal-content'>
						<AddEventPopup />
					</div>
				</div>
			</div>
		)
	}
}
 export default AddEvent;
