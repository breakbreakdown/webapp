import React from 'react';
import firebase from 'firebase';
import fire from './fireB.js'
import M from 'react-materialize';
import './toolbar.css';
import Clock from 'react-live-clock';
import {Redirect} from 'react-router-dom';

var database = firebase.database();
var user = firebase.auth().currentUser;


class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: "", todayLabel: "" }
		this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var today = new Date();
        var date = today.getDate();
        var month = months[today.getMonth()];
        var day = days[today.getDay()];
        this.setState({todayLabel: day + ', ' + month + ' ' + date})

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userRef = firebase.database().ref('users/' + user.uid);
                userRef.on('value', function (snapshot) {
                    this.setState({ userName: snapshot.val().firstName + " " + snapshot.val().lastName })
                }.bind(this));
                
            } else {
 
            }
        }.bind(this));

    }

    signOut() {
        
        firebase.auth().signOut().then(function () {
			localStorage.removeItem('appTokenKey');
			return <Redirect to='/signin' />;
			}.bind(this)
		)
		
    }

	render() {
		var currDate = new Date();
		var currTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		

		return (
            <div id='toolbar'>
                <div id='userName'>
					<i className="material-icons">person</i>
					<div>{this.state.userName}</div>
                </div>
                <div id='userTime'>
					<i className="material-icons">event</i>
					<div>{this.state.todayLabel}</div>
				</div>
				<div id='userTime'>
					<i className="material-icons">access_time</i>
					<div><Clock format={'h:mm A'} ticking={true} /></div>
				</div>
                <div id='settings'>
                    <i className="material-icons" onClick={this.signOut}>keyboard_tab</i>
                </div>
            </div>
		);
	}
}
 export default Toolbar;