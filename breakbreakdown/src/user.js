var userID ;
var isAuthenticated = false;
var fName;
var lName;
var email;
var token;

export function initUserData(userID, fName, lName, email, token) {
  userID = userID;
  isAuthenticated = true;
  fName = fName;
  lName = lName;
  email = email;
  token = token;
}

export {userID, isAuthenticated, fName, lName, email, token};
