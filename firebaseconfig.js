// Initialize Firebase
var config = {
  apiKey: "AIzaSyDLzsUyAl5J5GJ80Li9hjNgYNGVkIfOuF4",
  authDomain: "myquora-5c1ab.firebaseapp.com",
  databaseURL: "https://myquora-5c1ab.firebaseio.com",
  projectId: "myquora-5c1ab",
  storageBucket: "myquora-5c1ab.appspot.com",
  messagingSenderId: "738319900479"
};

var firebase = require("firebase");

firebase.initializeApp(config);

export { firebase };
