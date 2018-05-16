import React, { Component } from 'react';
import home from 'home.js';
import SignUpPage from 'SignUpPage.js'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <Router>
			<Route path="/" exact={true} component={SignUpPage} />
			<Route path="/home" exact={true} component={home} />
      </Router>
    );
  }
}
export default App;