import React from 'react';
class ChecklistItem extends React.Component {

	render() {
		return (
			<li className='collection-item'>
				<label>
					<input type='checkbox' className='checkbox'/>
					<span className='event-title'>{this.props.title}</span>
				</label>
			</li>
		);
	}
}
 export default ChecklistItem;