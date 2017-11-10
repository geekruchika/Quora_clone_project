import { firebase } from "../firebaseconfig";

export function SetToken(id, token) {
  var db = firebase.database().ref("/users/" + id + "/notification/");
  db.set({ token: token });
}

export function AuthenticateUser(nav) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var uid = user.uid;
      nav.navigate("User");
    } else {
      nav.navigate("Main");
    }
  });
}

export function LoginUser(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      alert("You are logged in now...");
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert("Email or password is badly formatted");
    });
}

export function LogOut(nav) {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Signed Out");

        const { navigate } = nav;
        nav.goBack("Main");
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
}

export function CreateUser(username, password, firstname, lastname, nav) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(username, password)
    .then(function() {
      var user = firebase.auth().currentUser;

      user
        .updateProfile({
          displayName: firstname + " " + lastname
        })
        .then(function() {
          alert("Account Created");
          alert("Now you can sign with your Email and Password");

          const { navigate } = nav;
          navigate("User");
        })
        .catch(function(error) {
          alert(error);
        });
    })
    .catch(function(error) {
      //var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorMessage);
    });
}

export function CurrentUser() {
  return firebase.auth().currentUser;
}

export function AddUserToDatabase(id, name, email) {
  var db = firebase.database().ref("/users/" + id);
  db.set({ email: email, user: name });
}

export function deleteUserQuesDatabase(ob) {
  var db = firebase.database().ref("/questions/" + ob.key);
  db.remove();
}

export function deleteUserAnswerDatabase(ob) {
  var db = firebase
    .database()
    .ref("/questions/" + ob.keyques + "/answer/" + ob.key);
  db.remove();
}

export function pushNotificationToOther(recevierkey) {
  return firebase.database().ref("/users/" + recevierkey + "/notification/");
}

export function getAllUsers() {
  return firebase.database().ref("/users/");
}

export function chatReference(senderKey, receiverKey) {
  return firebase.database().ref("/messages/" + receiverKey + senderKey);
}
