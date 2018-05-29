import React from 'react';
import Firebase from 'firebase';
import M from 'react-materialize';
import './graph.css';
import { VictoryPie } from 'victory-pie';
import Countdown from 'react-countdown-now';

class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {events:[], currTime:0}
	}
	
	componentWillMount() {
		var d = new Date();
		var totalMilliseconds = (d.getHours() * 3600000) + (d.getMinutes() * 60000) + (d.getSeconds() * 1000);
		this.setState({events:[{ x: " ", y: 6, title: "Fortnite Grind" }, { x: " ", y: 1, title: "Info 461 HW" }, { x: " ", y: 2, title: "Capstone Work"}],
						currTime: totalMilliseconds});
	}
	
	getTotalEventTime() {
		var totalEventTime = 0;
		var i;
		for (i = 0; i < this.state.events.length; i++) {
			totalEventTime += this.state.events[i].y * 3600000;
		}
		console.log(totalEventTime);
		return totalEventTime;
	}
	
	render() {
		
		return (
		  <div id='graph'> 
			<VictoryPie
			  colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
			  data={this.state.events}
			  innerRadius={150}
			  padding={{ top: 0, bottom: 0 }}
			  events={[{
					  target: "data",
					  eventHandlers: {
						onClick: () => {
						  return [
							{
							  target: "data",
							  mutation: (props) => {
								const fill = props.style && props.style.fill;
								return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
							  }
							}, {
							  target: "labels",
							  mutation: (props) => {
								return props.text === "clicked" ? null : { text: "clicked" };
							  }
							}
						  ];
						}
					  }
					}]}
			/>
			<div id="freetime-countdown">
				<div id="freetime-text"> Free Time </div>
				<div>
					<Countdown date={Date.now() + 86400000 - this.state.currTime - this.getTotalEventTime()} />
				</div>
			</div>
			
			<div id="totaltime-left">
				<div id="totaltime-left-text"> Time Left in Day </div>
				<div>
					<Countdown date={Date.now() + 86400000 - this.state.currTime} />
				</div>
			</div>
		  </div>
		);
	}
}
 export default Graph;