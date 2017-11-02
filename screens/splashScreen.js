import React from "react";
import { Spinner } from "native-base";
import { firebase } from "../firebaseconfig";

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let nav = this.props.navigation;
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log(displayName);
          //
          nav.navigate("User");
        } else {
          // const { navigate } = nav;
          // navigate("Main");
          nav.navigate("Main");
        }
      });
    }, 1000);
  }

  render() {
    return <Spinner />;
  }
}

export default SplashScreen;
