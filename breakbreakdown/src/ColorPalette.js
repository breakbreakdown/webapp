import React from 'react'
import reactCSS from 'reactcss'
import { TwitterPicker } from 'react-color'

class ColorPalette extends React.Component {
	state = {
		displayColorPicker: false,
		colors: ['#D68D9F', '#DEA26D', '#DEC26D', '#A0CC85', '#75B0D1', '#9689C7'],
		color: '#D68D9F'
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
			  borderRadius: '2px',
			  background: `${this.state.color}`,
			},
			swatch: {
			  borderRadius: '1px',
			  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
			  display: 'inline-block',
			  cursor: 'pointer',
			},
			popover: {
			  position: 'absolute',
			  right: '-9px',
			  top: '60px',
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
				<div style={ styles.swatch } onClick={ this.handleClick }>
				  <div style={ styles.color } />
				</div>
				{ this.state.displayColorPicker ? <div style={ styles.popover }>
				  <div style={ styles.cover } onClick={ this.handleClose }/>
				  <TwitterPicker width='168px'
								colors={this.state.colors}
								triangle='top-right'
								color={ this.state.color }
								onChange={ this.handleChange } />
				</div> : null }

			</div>
		)
	}
}

export default ColorPalette;