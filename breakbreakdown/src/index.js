import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import GoogleButton from 'react-google-button'
import handleSignIn from './login.js'
import homePage from './home.js'

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

ReactDOM.render(
  <InitHomePage />,
  document.getElementById('root')
);
registerServiceWorker();
