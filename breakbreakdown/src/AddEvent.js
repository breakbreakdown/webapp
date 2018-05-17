import React from 'react';
import Firebase from 'firebase';
import M from 'react-materialize';
import './addevent.css'

class AddEvent extends React.Component {
	render() {
		return (
		  <div id='addevent'>
			<span id='add-event-title'> Add Event </span>
			<a className='waves-effect waves-light btn' id='add-event-btn'><i className="material-icons">
add
</i></a>
		  </div>
		)
	}
}
 export default AddEvent;
