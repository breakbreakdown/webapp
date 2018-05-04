# Architectural Specification
##### Version: 1.0
##### Team: Andrew Tran, Benjamin Nogawa, Constance La, Juan Alvarez, Phillip Park
---
## **Overall** 
- Icons: Material Design Icons
- Forms & Checkboxes: Materialize
- Chart: VictoryPi
- Database: Firebase
- Calendar: Google Calendar API

## **Global Properties**
| Name | Type | Description |
| --- | --- | --- |
| userID | String | The user ID retrieved on login |
| userObject | Object | Object containing user information and the users calendar |

## **Sign-Up**
[Desc]

### Functionality
| Name            | Parameters                           | Return      | Behavior      |
| --------------- | ------------------------------------ | ----------- | ------------- |
| validateEmail() | String                               | Boolean     | Check if email is valid. If valid return true, if not return false |
| matchPassword() | Password (String), Password (String) | Boolean     | Check if passwords match. If match return true, if not return false |
| callGoogle()    | Google email (String)                | Boolean     | Sign into Google account, return true if sign-in was successful, return false if sign in failed |
| validPassword() | Password (String)                    | Boolean     | Check if password is valid, if valid return true, if false return false |
| onClickSignUp() |                                      |             | Checks that all fields are valid before pushing to firebase. If not valid display error message associated with the invalid field (Invalid password, invalid email, passwords don’t match ect) |
| onClickSignIn() |                                      |             | Go to sign in page |

## **Sign-In**
[Descrp]

### Functionality
| Name            | Parameters                        | Return           | Behavior      |
| --------------- | --------------------------------- | ---------------- | ------------- |
| onClickSignIn() | Email (String), Password (String) | User ID (String) | Sign in button clicked
Verify email and password with firebase
If the password and email combo doesn't work display error message “Invalid email or password” |
| onClickSignUp() |                                   |                  | Go to sign up page |

### Outputs
| Name | Description |
| --- | --- | 
| UserID | Stores UserID as global variable |

## **ToolBar**
### Functionality
| Name              | Parameters    | Return      | Behavior      |
| ----------------- | ------------- | ------------ | ------------- |
| initToolBar()     |               |              | Pulls user’s name, date, time from User object. Load data into home’s header |
| onClickSettings() |               |             | Unhide settings popup |

### Inputs
| Name | Description |
| --- | --- | 
| userObject | Pulls user object from global variable |

## **GetUserData**
[Description]

### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
| userCalendar    | HashMap<K,V> | HashMap stores all of the day objects as values and dates as keys |

### Functionality
| Name            | Parameters       | Return        | Behavior      |
| --------------- | ---------------- | ------------- | ------------- |
| pullCalendar()  | User ID (String) | User (Object) | Gets user’s schedule from Google Calendar for the current date, stores the userObject as a global variable |
| pushCalendar() |              |             | Push user’s schedule to Firebase |
| checkChanges() |              |             | Compares Firebase DB to Google’s DB. If different, update stored calendar |

### Inputs
| Name | Description |
| --- | --- | 
| userID | Pulls userID from global variable |

### Outputs
| Name | Description |
| --- | --- | 
| userObject | Stores the user object gotten in pullCalendar as a global variable |

## **Graph**
[Description]

### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
| userEvents      | [Event]    | Array of Event objects |

### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| calcCirclePercent() |  | [Double] | Calculates the percentage of each event that takes up the day based on each event’s duration field and round percentages up to one decimal point |
| genFreeTimeCnt()    |              |             | Generates free time counter display with the label on top of a hh:mm:ss counter |
| calcFreeTime() |              |             | Calculate how much free time is left in the day. Sum up total duration of all events for the day and subtract that number from the time left in the day |
| getTimeLeftCnt()      |       |             | Generates time left in the day counter display with label on top of a hh:mm:ss counter. |
| renderGraph()      | [Double] |             | Use VictoryPi module to create graph |
| onClickSection() |  Event  |             | Calls the event details popup for the selected Event |
| onHoverSection()      | Event |             | Calls EventHover to generate and display an event summary popup. Called when the user’s cursor hovers over a section of the graph |

### Inputs
| Name | Description |
| --- | --- | 
| userObject.calendar | Pulls the event data for the current day on the user’s calendar |

### Outputs
| Name | Description |
| --- | --- | 
| EventDetails| Passes the data for the selected event to the EventDetails popup |
| EventHover | Passes the selected event’s title and duration to EventHover to generate |

## **EventHover**
[Description]

### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| displaySummary()      | Event |             | Pulls name and duration from event object and displays it in a bordered box. Border will have the same rgb as assigned to the event color property. |

### Inputs
| Name | Description |
| --- | --- | 
| User.calendar | Pulls title and duration fields from the selected event from the user’s calendar |



## **Checklist**
[Description]

### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| componentDidMount() |              |             | Import getUserData.js |
| initLayout() |              |             | Loops through the user’s events for the day and creates a list item for each event using Materialize forms/checkboxes. Pulls eventTitle from each event to display as the text for each list item. |
| onClickComplete() |              |             | Moves selected event to bottom of list. Change color of event name to grey. Checkmark in event’s checkbox. Mark as completed event on Firebase |
| onClickEvent() |              |             | Unhides event details popup with the clicked event’s data |

### Inputs
| Name | Description |
| --- | --- | 
| userObject.calendar | Pulls event array for the current day from the user’s calendar used to populate the checklist |

## **AddEvent Button**
[Description]

### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| onClickAdd() |              |             | Opens add event popup |

## **AddEvent Popup**
[Description]
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| onClickColor() |              |             | Unhide color palette |
| onClickCancel() |              |             | Hides Add Event popupp |
| onAddEvent() |              |             | Push to Google Calendar and Firebase, Must push to google Calendar first, then pull event ID generated by google, attach that ID to event and push to Firebase |

## ColorPalette
[Description]
### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
| Colors |  [String]  | Array of color ID strings for color palette |

### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| renderPalette() | Colors       |             | Unhides a color palette popup|
| onClickColor() |              |  String | Sends color string to AddEvent. 
|
| onClickClose() |         |             | Hides color palette popup |

### Outputs
| Name | Description |
| --- | --- | 
|AddEvent | Passes color id string for the box selected by the user in the color palette |
| EventDetailsEdit | Passes color id string for the box selected by the user in the color palette |

## **EventDetails**
[Description]

### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
| Event |  Event  | Event object passed in from click |

### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| renderDetails() | Event        | EventID| Pulls all parameters from the Event object to populate fields in the form. Renders uneditable form pre-filled with event details data|
| onClickDelete() |              |             | Deletes key from database and Google Calendar. Refreshes list and graph |
| onClickEdit() |              |             | Hides detail buttons. Shows edit button. Makes color and all forms editable |
| onClickCancel() |              |             | Hides edit button. Shows detail buttons. Makes all forms uneditable |
| onClickSave() |              |             | Pushes form changes to Google Calendar and Firebase |
| onClickColor() |              |             | Unhide color palette |
| onClickClose() |              |             | 
Hide event details popup |

### Inputs
| Name | Description |
| --- | --- | 
| userObject.calendar | Pulls event array for the current day from the user’s calendar used to populate the checklist |

## Settings
### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
|                 |            |               |
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
|                 |              |             |               |