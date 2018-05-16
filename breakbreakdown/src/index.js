import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import GoogleButton from 'react-google-button'
import handleSignIn from './login.js'
import home from './home.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class InitHomePage extends React.Component {
  render() {
    return (
      <div id="main">
        <h1>BreakBreakdown</h1>
        <GoogleButton id="googleButton" onClick={handleSignIn}/>
      </div>
    )
  }
}

ReactDOM.render((
  <Router>
	<div className="Routes">
		<Route exact path='/' component={InitHomePage} />
		<Route path='home' component={home} />
	</div>
  </Router>),
  document.getElementById('root')
);

registerServiceWorker();
