import React from 'react';
import firebase from 'firebase';
import fire from './fireB.js'
import M from 'react-materialize';
import './toolbar.css';

var database = firebase.database();
var user = firebase.auth().currentUser;


class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: "", todayLabel: "" }
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
        console.log("LOGGING OUT");
        user.signOut();
    }

    render() {
		return (
            <div id='toolbar'>
                <div id='userName'>
                    <i className="material-icons">person</i><p>{this.state.userName}</p>
                </div>
                <div id='userTime'>
                    <i className="material-icons">calendar_today</i><p>{this.state.todayLabel}</p>
                </div>
                <div id='settings'>
                    <i className="material-icons" onClick={this.signOut}>keyboard_tab</i>
                </div>
            </div>
		);
	}
}
 export default Toolbar;