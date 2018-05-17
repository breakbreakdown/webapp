import React from 'react';
import Firebase from 'firebase';
import M from 'react-materialize';
import './graph.css';
import { VictoryPie } from 'victory-pie';

class Graph extends React.Component {
	
	
	
	render() {
		return (
		  <div id='graph'> 
			<VictoryPie
			  colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
			  data={[
				{ x: "Cats", y: 35 },
				{ x: "Dogs", y: 40 },
				{ x: "Birds", y: 55 }
			  ]}
			  innerRadius={100}
			/>
		  </div>
		);
	}
}
 export default Graph;