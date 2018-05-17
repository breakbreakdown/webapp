var userID ;
var isAuthenticated = false;
var fName;
var lName;
var email;
var token;

export function initUserData(id, first, last, userEmail, googleToken) {
  userID = id;
  isAuthenticated = true;
  fName = first;
  lName = last;
  email = userEmail;
  token = googleToken;
}

export default {userID, isAuthenticated, fName, lName, email, token};
