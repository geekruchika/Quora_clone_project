import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Input,
  Form,
  Item,
  Label,
  Tab,
  Tabs,
  TabHeading
} from "native-base";
import { MonoText } from "../components/StyledText";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";

class UserAnswer extends React.Component {
  state = {
    userName: "",
    email: "",
    uid: ""
  };

  componentWillMount() {
    var thisref = this;
    var name, email, uid;
    var user = firebase.auth().currentUser;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;
    }
    this.setState({
      userName: name,
      email: email,
      uid: uid
    });

    // var db = firebase.database().ref("/users/");
    // db
    //   .orderByKey()
    //   .once("value")
    //   .then(function(snapshot) {
    //     snapshot.forEach(function(snap) {
    //       var key = snap.key;

    //       var name = snap.child("user").val();
    //       var ob = { key, name };
    //       Allusers.push(ob);
    //       if (Allusers.length === snapshot.numChildren()) {
    //         thisref.setState({
    //           Alluser: Allusers,
    //           userid: uid
    //         });
    //       }
    //     });
    //   });
  }
  render() {
    return (
      <View>
        <Text>{this.state.userName}</Text>
      </View>
    );
  }
}

export default UserAnswer;
