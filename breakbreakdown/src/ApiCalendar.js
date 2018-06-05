const Config = {
    "clientId": "534313689390-4fq78tg8hg3ucvrr5caj7qjc6255hq77.apps.googleusercontent.com",
    "apiKey": "AIzaSyDk_qX1ujvEGokVrS6iM7BB2NyT9eFYEws",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
};

class ApiCalendar {
    constructor() {
        this.sign = false;
        this.gapi = null;
        this.onLoadCallback = null;
        this.calendar = 'primary';
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
        this.initClient = this.initClient.bind(this);
        this.handleSignoutClick = this.handleSignoutClick.bind(this);
        this.handleAuthClick = this.handleAuthClick.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
        this.createEventFromNow = this.createEventFromNow.bind(this);
        this.listenSign = this.listenSign.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.setCalendar = this.setCalendar.bind(this);
        this.handleClientLoad();
    }

    loadClientWhenGapiReady = (script) => {
        if (script.getAttribute('gapi_processed')) {
            window['gapi'].load('client:auth2', this.initClient);
        }
        else {
            setTimeout(() => { this.loadClientWhenGapiReady(script) }, 300);
        }

    }

    /**
     * Init Google Api
     * And create gapi in global
     */
    handleClientLoad() {
        const script = document.createElement("script");
        script.onload = () => {
            // Gapi isn't available immediately so we have to wait until it is to use gapi.
            this.loadClientWhenGapiReady(script);
            //window['gapi'].load('client:auth2', this.initClient);
        };
        script.src = "https://apis.google.com/js/client.js";
        document.body.appendChild(script);
    }

    /**
     * Update connection status.
     * @param {boolean} isSignedIn
     */
    updateSigninStatus(isSignedIn) {
        this.sign = isSignedIn;
    }
    /**
     * Auth to the google Api.
     */
    initClient() {
        this.gapi = window['gapi'];
        this.gapi.client.init(Config)
            .then(() => {
                // Listen for sign-in state changes.
                this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
                // Handle the initial sign-in state.
                this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
                if (this.onLoadCallback) {
                    this.onLoadCallback();
                }
            });
        return true;
    }

    /**
     * Sign in Google user account
     */
    handleAuthClick() {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signIn();
            //console.log(this.gapi.auth2.getAuthInstance().isSignedIn.get());
        } else {
            setTimeout(() => { this.handleAuthClick() }, 300);
            console.log("Error: this.gapi not loaded. Loading again...");
        }
    }
    /**
     * Set the default attribute calendar
     * @param {string} newCalendar
     */
    setCalendar(newCalendar) {
        this.calendar = newCalendar;
    }
    /**
     * Execute the callback function when a user is disconnected or connected with the sign status.
     * @param callback
     */
    listenSign(callback) {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
        }
        else {
            setTimeout(() => { this.listenSign(callback) }, 300);
            console.log("listenSign: this.gapi not loaded. Loading again...");
        }
    }
    /**
     * Execute the callback function when gapi is loaded
     * @param callback
     */
    onLoad(callback) {
        if (this.gapi) {
            callback();
        }
        else {
            this.onLoadCallback = callback;
        }
    }
    /**
     * Sign out user google account
     */
    handleSignoutClick() {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signOut();
        }
        else {
            console.log("Error: this.gapi not loaded");
        }
    }
    /**
     * List all events in the calendar
     * @param {number} maxResults to see
     * @param {string} calendarId to see by default use the calendar attribute
     * @returns {any}
     */
    listUpcomingEvents(maxResults, calendarId = this.calendar) {
        if (this.gapi) {
            let myEvents = [];
            let timeMax = new Date();
            timeMax.setHours(24, 0, 0, 0);
            timeMax = timeMax.toISOString();
            var request = this.gapi.client.calendar.events.list({
                'calendarId': calendarId,
                'timeMin': new Date().toISOString(),
                'timeMax': timeMax,
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': maxResults,
                'orderBy': 'startTime'
            });
            return new Promise(function (resolve, reject) {
                request.execute(function (resp) {
                    var events = resp.items;
                    if (events.length > 0) {
                        for (let i = 0; i < events.length; i++) {
                            let event = events[i];
                            myEvents[i] = {
                                eventName: event.summary,
                                colorId: event.colorId,
                                duration: '30',
                                startTime: event.start["dateTime"],
                                endTime: event.end["dateTime"],
                                location: event.location,
                                notes: event.description,
                                eventId: event.id
                            };

                        }
                    } else {
                        myEvents = null;
                    }
                    resolve(myEvents);
                });
            });
        } else {
            console.log("Error: this.gapi not loaded");
            setTimeout(() => { this.listUpcomingEvents(maxResults, calendarId = this.calendar) }, 300);
            return;
        }
    }
    /**
     * Create an event from the current time for a certain period
     * @param {number} time in minutes for the event
     * @param {string} summary of the event
     * @param {string} description of the event
     * @param {string} calendarId
     * @returns {any}
     */
    createEventFromNow({ time, summary, description = '' }, calendarId = this.calendar) {
        const event = {
            summary,
            description,
            start: {
                dateTime: (new Date()).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                dateTime: (new Date(new Date().getTime() + time * 60000)),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            }
        };
        return this.gapi.client.calendar.events.insert({
            'calendarId': calendarId,
            'resource': event,
        });
    }
    /**
     * Create Calendar event
     * @param {string} calendarId for the event.
     * @param {object} event with start and end dateTime
     * @returns {any}
     */
	createEvent(name, location, notes, colorId, startTime, endTime, recurrence, calendarId = this.calendar) {
		console.log(startTime);
		console.log(endTime);
        var event = {
            'summary': name,
            'location': location,
            'description': notes,
            'colorId': colorId,
            'start': {
				'dateTime': startTime,
				'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
				'dateTime': endTime,
				'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
			},
			'recurrence': [recurrence]
        };

        var request = this.gapi.client.calendar.events.insert({
            'calendarId': calendarId,
            'resource': event
        });

		request.execute(function (event) {
			alert("This event has been added to your Google Calendar. Press Cancel");
            //appendPre('Event created: ' + event.htmlLink);
            return event.id;
        });
    }

}

const apiCalendar = new ApiCalendar();
export default apiCalendar;