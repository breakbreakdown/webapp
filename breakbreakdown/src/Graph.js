import React from 'react';
import Firebase from 'firebase';
import M from 'react-materialize';
import './graph.css';
import { VictoryPie } from 'victory-pie';

class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {events:[]}
	}
	
	componentWillMount(){
		this.setState({events:[{ x: "Fortnite Grind", y: 6 }, { x: "Info 461 HW", y: 1 }, { x: "Capstone Work", y: 2}]});
	}
	
	render() {
		return (
		  <div id='graph'> 
			<VictoryPie
			  colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
			  data={this.state.events}
			  innerRadius={100}
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
		  </div>
		);
	}
}
 export default Graph;