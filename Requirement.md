# BreakBreakdown Web Application

#

## Requirement Outline

Andrew Tran, Benjamin Nogawa, Constance La, Juan Alvarez, Phillip Park

Git Schwifty INFO 461 Sp&#39; 17







**Application Flow Diagram**

**Requirement Notes**

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
    - Sign In, Sign Up, Add Event, Settings - RGB(117, 176, 209)
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

**Sign-Up**

- Fields
  - Name (text field)
  - Email (text field)
    - Check for valid email using \*\*\*\*\*@\*\*\*\*\*.\*\*\*(com, edu,net, gov, org) format
    - Email is stored in Firebase
  - Password (text field)
    - Password is stored in Firebase
  - Confirm password (text field)
    - Checks if the password is the same as the password in the first password field

- Connect google account (required)
  - Required fields to login to google
    - Email
    - Password
  - Confirm button
    - If confirmed, marks the account as a google calendar user in the database
    - If user is a google calendar user, checks their google calendar daily to pull events from their calendar into our application.
- Link to Sign-In page (&quot;Already a member?&quot;)
  - Sends you to the sign in page
- Sign-up button
  - Clicking sign-up button will send you to homepage
  - Sends all the fields to the database to store (Name, email, password)

**Add Event (popup)**

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
        - Start time drop down menu that indicates what time the scheduled event starts in intervals of 30 minutes
        - End time drop down menu that indicates what time the scheduled event ends in intervals of 30 minutes
        - AM/PM drop down menu for users to indicate if its AM or PM
        - End time must be after start time. If not, show red error under fields that say &quot;End time can not be before start time&quot;
      - If non-scheduled task
        - Sent to google calendar API as all day event
        - Hour field to indicated how many hours the task will take
        - Minute field to indicate how many minutes the event will take.
  - Color
    - Scroller menu of preset colors
    - Red, blue, green, yellow, orange, pink; any shade of these colors
    - 16 preset colors limit
    - One custom color that takes in rgb input
      - RGB slider with color preview next to slider
      - Sets the event color based on the rgb that the user has provided
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

 

**Edit Settings (popup)**

- Email Field and Google Account Field
  - Text input pre filled with users current email
  - Allows users to edit the text
  - Change email/ change Google Account button
    - Confirm popup to confirm change
      - Accept button
        - Checks if text box is different than user&#39;s current email
        - If it&#39;s not different, clicking it shows error saying &quot;Email not changed&quot;
        - If it is different, clicking it changes email in our database and shows green message saying &quot;Change email successful&quot;
      - Cancel button
        - Changes email in Email/Google Account field back to current saved email in database
- Change password
  - Unhides a &quot;Current Password&quot; field, &quot;New Password&quot; field, and a &quot;Confirm New Password Field&quot;
  - Unhides a confirm button.
  - Confirm button
    - Checks if current password field matches the current password of the user. If not show error under that field saying &quot;Wrong Password&quot;
    - Checks if New Password and Confirm New Password field matches each other. If not, show error under Confirm New Password Field that says &quot;Passwords do not match&quot;
- X button on top right that closes the popup. Shows home screen.
- On hover
  - **Summary Detail** (popup)
    - Title
      - Displays the title of the event
    - Duration