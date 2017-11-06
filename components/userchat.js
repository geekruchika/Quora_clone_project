import React, { Component } from "react";
import { TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
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
  View,
  Icon,
  Text,
  Input,
  Form,
  Item,
  Label,
  Tab,
  Tabs,
  TabHeading,
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem
} from "native-base";
import { MonoText } from "../components/StyledText";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";
import { GiftedChat } from "react-native-gifted-chat";

class UserChat extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    Alluser: [],
    userid: ""
  };

  componentWillMount() {
    var Allusers = [];
    var thisref = this;
    var name, email, uid;
    var user = firebase.auth().currentUser;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;
    }
    var db = firebase.database().ref("/users/");
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(snap) {
          var key = snap.key;

          var name = snap.child("user").val();
          var ob = { key, name };
          Allusers.push(ob);
          if (Allusers.length === snapshot.numChildren()) {
            thisref.setState({
              Alluser: Allusers,
              userid: uid
            });
          }
        });
      });
    // .catch(error => {
    //   reject(error);
    // });
  }
  componentDidMount() {}

  arrayrender() {
    // let nav = this.props.navigation;
    // console.log(this.props.navigation);
    // var ques = this.props.record["record"];
    // var name = this.state.userName;
    let nav = this.props.navigation;
    let thisref = this;
    return this.state.Alluser.map(function(el, i) {
      if (thisref.state.userid != el.key)
        return (
          <ListItem
            key={i}
            avatar
            onPress={() => {
              const { navigate } = nav;
              navigate("Chat", { key: el.key, name: el.name });
            }}
          >
            <Left>
              <Thumbnail source={require("../img/Q.jpg")} />
            </Left>
            <Body>
              <Text>{el.name}</Text>
            </Body>
            <Right>
              <Icon
                name="chatbubbles"
                onPress={() => {
                  const { navigate } = nav;
                  navigate("Chat", { key: el.key, name: el.name });
                }}
              />
              {/* <Text note>1:20 pm</Text> */}
            </Right>
          </ListItem>
        );
    });
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Chat List</Text>
          </CardItem>
        </Card>
        <List>{this.arrayrender()}</List>
      </View>
    );
  }
}

export default UserChat;
