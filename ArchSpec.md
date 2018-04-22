# Architectural Specification
##### Version: 1.0
##### Team: Andrew Tran, Benjamin Nogawa, Constance La, Juan Alvarez, Phillip Park
---
## Overall
- Icons: Material Design Icons
- Forms & Checkboxes: Materialize
- Chart: VictoryPi
- Database: Firebase
- Calendar: Google Calendar API

## Sign-Up
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| validateEmail() |              |             | Check if email is valid |
| matchPassword() |              |             | Check if passwords match |
| callGoogle()    |              |             | Sign into Google account |
| validPassword() |              |             | Check if password is valid |
| onClickSignUp() |              |             | Sign up button clicked, push info to Firebase |
| onClickSignIn() |              |             | Go to sign in page |

## Sign-In
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| onClickSignIn() |              |             | Sign in button clicked. Verify email and password |
| onClickSignUp() |              |             | Go to sign up page |

## ToolBar
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| initToolBar()   |              |             | Pulls user’s name, date, time. Load data into home’s header |
| onClickSettings() |              |             | Open settings popup |

## GetUserData
### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
| userCalendar    | HashMap<K,V> | HashMap stores all of the day objects as values and dates as keys |
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| pullCalendar() |              |             | Gets user’s schedule from Google Calendar for the current date |
| pushCalendar() |              |             | Push user’s schedule to Firebase |
| checkChanges() |              |             | Compares Firebase DB to Google’s DB. If different, update stored calendar |

## Graph
### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
| userEvents      | [Event]    | Array of Event objects |
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| componentDidMount() |              |             | Import getUserData.js |
| calcCirclePercent() |              |             | Calculates the percentage of each event that takes up the day. Round to nearest percent |
| genFreeTimeCnt()    |              |             | Generates free time counter |
| calcFreeTime() |              |             | Calculate how much free time is left in the day |
| getTimeLeftCnt()      |       |             | Generates and initializes time left counter |
| pullDuration()      |       |             | Pull the amount of time each event is going to take |
| renderGraph()      | userEvents |             | Use VictoryPi module to create graph |
| onClickSection() |  Event  |             | Calls the event details popup for the selected Event |
| onHoverSection()      |       |             | Call and generate summary detail popup |

## EventSummaryPopup
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| displaySummary()      |       |             | Pulls name and duration from event object and displays it |

## Checklist
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| componentDidMount() |              |             | Import getUserData.js |
| initLayout() |              |             | Create list of events |
| onClickComplete() |              |             | Moves selected event to bottom of list. Change color of event name to grey. Mark as completed event on Firebase |
| onClickEvent() |              |             | Opens Event Details popup |

## AddEvent Button
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| onClickAdd() |              |             | Opens add event popup |

## AddEvent Popup
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| onClickColor() |              |             | Unhide color palette |
| onClickCancel() |              |             | Closes Add Event popup |
| onAddEvent() |              |             | Push to Google Calendar and Firebase |

## ColorPalette
### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
| Colors |  [String]  | Array of RGB strings for color palette |
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| renderPalette() | Colors       |             | Renders boxes with preset colors |
| onClickColor() |              |  String | Sends RGB to AddEvent. Closes popup |
| onClickClose() |         |             | Closes color palette |

## EventDetails
### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
| Event |  Event  | Event object passed in from click |
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
| renderDetails() | Event        |         | Renders forms pre-filled with event details data |
| onClickDelete() |              |             | Renders key from database and Google Calendar. Refreshes list and graph |
| onClickEdit() |              |             | Hides detail buttons. Shows edit button. Makes color and all forms editable |
| onClickCancel() |              |             | Hides edit button. Shows detail buttons. Makes all forms uneditable |
| onClickSave() |              |             | Pushes form changes to Google Calendar and Firebase |
| onClickColor() |              |             | Unhide color palette |
| onClickClose() |              |             | Close popup |

## Settings
### Properties
| Name            | Type   | Description |
| --------------- | ---------- | ------------- |
|                 |            |               |
### Functionality
| Name            | Parameters   | Return      | Behavior      |
| --------------- | ------------ | ----------- | ------------- |
|                 |              |             |               |