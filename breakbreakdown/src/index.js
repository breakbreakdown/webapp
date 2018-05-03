import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

<Router history={customHistory}>
    <div>
        <Route path="/login" component={Login}/>
        <Route path="/app/home" component={Home}/>
        <Redirect from="/" to="/login"/>
    </div>
</Router>
