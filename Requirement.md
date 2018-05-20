**Requirement Notes**

**Application Flow Diagram**
![Application Flow Diagram ](https://github.com/breakbreakdown/webapp/blob/master/img/ApplicationFlowDiagram.png)

**Overall Notes**

- Google session sometimes times out, make sure that this prompts a re-login rather than a page cannot load error or a crash
- Only push changed fields when editing, there are many other fields supported by the API but we will only be using Title, Start/End time (Non-Scheduled tasks will be pushed as all day events) notes, location, date, and recurring information
- Colors, fonts for labels, titles, text fields
  - General Colors
    - All Page Backgrounds - RGB(117, 176, 209)
    - Accent Colors - RGB(117, 176, 209)
    - Section Backgrounds - RGB(255, 255, 255)
  - Text
    - &quot;Breakbreakdown&quot; title
      - Pacifico Font
      - RGB(255, 255, 255)
    - All other text
      - Gill Sans MT
      - RGB(0, 0, 0)
  - Buttons
    - Google Sign in Button
    - Save and Edit - RGB(159, 198, 136)
    - Delete and Cancel - RGB(210, 85,115)
  - 16 Event Label Colors
    - RGB(34,252,187)
    - RGB(209,61,44)
    - RGB(32,77,242)
    - RGB(231,196,56)
    - RGB(167,45,141)
    - RGB(242,179,34)
    - RGB(163,104,130)
    - RGB(74,107,112)
    - RGB(166,207,223)
    - RGB(17,197,43)
    - RGB(236,101,198)
    - RGB(172,155,156)
    - RGB(229,250,89)
    - RGB(2,20,2)
    - RGB(117,85,233)
    - RGB(209,96,121)

**Sign-In**
![signin ](https://github.com/breakbreakdown/webapp/blob/master/img/signin2.png)
- Fields
  - Input data
    - Sign-in button
      - Sign-in button(Google). Don’t use image above, just have a Google Sign in Button
      - Clicking sign-in button will send you to homepage

**Add Event (popup)**
![add event ](https://github.com/breakbreakdown/webapp/blob/master/img/AddEvent.png)
- Adds new event and also adds it to the user&#39;s google calendar
- Fields
  - Title (text field)
    - Not null; throw message saying &quot;Title must have a name.&quot;
  - Date
    - Scroll menu type since the Google Calendar API creates the event given the data as &#39;yyyy-mm-dd&#39; format
    - Not null; throw message saying &quot;Date must not be empty.&quot;
  - Start/End time/Estimated Time
    - Selector if its a scheduled event (class, work, etc...) or non-scheduled task (clean room, do laundry, etc...)
      - If scheduled
        - Uses a start and end time picker popup to select start and end times
        - End time must be after start time. If not, show red error under fields that say “End time can not be before start time”
      - If non-scheduled task
        - Sent to google calendar API as all day event
        - Hour field to indicated how many hours the task will take
        - Minute field to indicate how many minutes the event will take.
  - Color
    - Scroller menu of preset colors
    - User can not choose a custom color, can only select from preselected colors
  - Location (text field only, since there is no GPS compatibility)
    - Input location of the event as text
    - Null accepted
  - Recurring
    - Drop-down menu
      - If on, unhide input fields
        - Repeat scroller indicating how frequent the repeat is
          - Daily
          - Weekly
          - Monthly
          - Yearly
        - Begin date for recurring event
        - End date for recurring event
  - Notes (text field)
    - Input description about the event
    - Null accepted
- Add event button that users will click to confirm addition of the event to their calendar
  - Pushes all the fields of the event to the database (Title, Date, Start Time, End Time, Color, Location, If its recurring, If recurring then the frequency of the event, and the notes)
  - Check if any of the fields that should not have null (Title, Date, Time) are null.
    - If they are null, show the null message to the user that is assigned to each field.
    - &quot;This field is required&quot; message next to empty fields
- Cancel button
  - Closes popup, shows the home screen
  - Does not push data to google calendar



**Event Details** (popup)
![event details ](https://github.com/breakbreakdown/webapp/blob/master/img/eventname.png)
- Color of text fields and buttons match color of the event
- Title
  - Displays title of the event based on what the user inputed in Add Event popup
- Start/end/estimated
  - Displays the start/end/estimated time of the event based on what the user inputed in Add Event popup
- Color
  - Displays the color the event was assigned based on what the user inputed in Add Event popup
- Location
  - Displays the location of the event based on what the user inputed in Add Event popup
- Notes
  - Displays the description of the event based on what the user inputed in Add Event popup
- Event delete button
  - Deletes event
  - Removes it from user&#39;s google calendar
  - Pop-up to confirm delete with message and confirm and cancel buttons


**Event Edit** button (popup)
![event edit ](https://github.com/breakbreakdown/webapp/blob/master/img/EventNameEdit.png)
- Same fields as in the create events popup, except the fields are preloaded with the information already input
- Change popup to event details after clicking these two buttons below
  - Save edits
    - Push new fields to google calendar and our database (firebase)
  - Cancel buttons



**Settings (popup)**
![Setting ](https://github.com/breakbreakdown/webapp/blob/master/img/setting.png)
- Email Field
  - Displays user&#39;s current email stored in database with &quot;Email&quot; label
- Google Account Field
  - Displays user&#39;s current email stored in database with &quot;Google Account&quot; label
- Edit button
  - Located on bottom of popup
  - Opens Edit Settings popup
- X button on top right that closes popup and shows home screen

**Header Bar**
![homescreen ](https://github.com/breakbreakdown/webapp/blob/master/img/homescreen.png)
- Profile icon with user name on left of bar
- Calendar icon with day of week, month, and day in middle of bar
- Clock icon with current time on right of bar
- Logout Button on right of bar logs the user out on click and brings them back to the sign in page

**Checklist**

- List of added events
  - Each event has a small vertical bar with the color being the color it was assigned to
  - On hover, change cursor to the pointer finger to show users it can be clicked
  - On click, show users the event detail screen as an Event Details popup
  - List ordered by scheduled time
    - Un-scheduled tasks first on list
- Check off events
  - Event&#39;s checkbox checked off when clicked
  - Event&#39;s title &quot;faded out&quot; - font color changed to light grey
  - Event moved to the bottom of the checklist
  - Update chart
    - Remaining amount of time of the event added to amount of freetime
    - Event slice is removed from the chart

**Graph**
![homescreen ](https://github.com/breakbreakdown/webapp/blob/master/img/homescreen.png)
- Free time counter
  - Located in the center of the graph
  - hh/mm/ss counter with &quot;free time&quot; label above it
- Time left in the day counter
  - Located in the center of the graph
  - The free time left should be the 24:00 - users current time in the selected time zone - total duration of all events added to account.
  - hh/mm/ss counter in the center of time chart with &quot;Time left In the Day&quot; label
  - Smaller than original free time counter
- Events sectioned
  - Scaled based on the portion of the remainder of the day that event will take up
    - Based on
      - For scheduled events
        - Time between start and finish
      - For non-scheduled tasks
        - Estimated time value
- On click
  - Opens Event Detail popup for the event selected on the graph

- On hover
  - **Summary Detail** (popup)
    - Title
      - Displays the title of the event
    - Duration
