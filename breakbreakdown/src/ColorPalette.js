import React from 'react'
import reactCSS from 'reactcss'
import { TwitterPicker } from 'react-color'

class ColorPalette extends React.Component {
	state = {
		displayColorPicker: false,
		colors: ['#7986cb', '#33b679', '#8e24aa', '#e67c73', '#f6c026', '#f5511d', '#039be5', '#616161', '#3f51b5', '#0b8043', '#d60000', '#5484ed'],
		color: this.props.color
	};

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker })
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false })
	};

	handleChange = (color) => {
		this.setState({ color: color.hex })
		this.handleClose()
	};

	render() {

		const styles = reactCSS({
		  'default': {
			color: {
			  width: '30px',
			  height: '30px',
			  borderRadius: '5px',
			  background: `${this.state.color}`,
			  display: 'inline-block',
			  cursor: 'pointer'
			},

			popover: {
			  position: 'absolute',
			  right: '0',
			  
			  zIndex: '2',
			},
			cover: {
			  position: 'fixed',
			  top: '0px',
			  right: '0px',
			  bottom: '0px',
			  left: '0px',
			},
		  },
		});

		return (
			<div id='color-palette'>
	
				<div id='selected-color' style={styles.color} onClick={this.handleClick} />

				{ this.state.displayColorPicker ? <div style={styles.popover}>
				  <div style={styles.cover} onClick={this.handleClose}/>
				  <TwitterPicker width='168px'
								colors={this.state.colors}
								triangle='hide'
								color={this.state.color}
								onChange={this.handleChange} />
				</div> : null }

			</div>
		)
	}
}

export default ColorPalette;