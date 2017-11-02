import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView
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

import { increment, decrement, fetchrecord, postContent } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import rootsaga from "../sagas/sagas";

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    //this.nav = this.props.navigation;
  }
  state = {
    newContent: "",
    userName: "",
    id: "",
    question: [],
    value: ""
  };

  componentWillMount() {
    // console.log(this.props.record);
    const thisRef = this;
    // console.log(this.state.question);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var id1 = user.uid;
        thisRef.setState({
          userName: displayName,
          id: id1
        });

        var db = firebase.database().ref("/users/" + user.uid);
        db.set({ email: email, user: displayName });
      } else {
        // User is signed out.
        // ...
      }
    });

    this.props.dispatch({
      type: "START_CONTENT"
    });
  }
  componentDidMount() {
    // console.log(this.props.record);
  }
  postContent() {
    this.setState({ value: "" });
    this.props.dispatch({
      type: "POST_CONTENT",
      payload: {
        uid: this.state.id,
        user: this.state.userName,
        Content: this.state.newContent
      }
    });
    const thisRef = this;
    // // console.log(thisRef);
    // var db = firebase.database().ref("/questions/" + this.state.id);
    // console.log(db);
    // if (this.state.newContent != "")
    //   db.push({ user: this.state.userName, text: this.state.newContent });

    // db.once("value", function(snapshot) {
    //   // var data = snapshot.val();
    //   //data = snapshot.child("text").val();
    //   var ques = [];
    //   snapshot.forEach(function(textsnap) {
    //     //var key = textsnap.key();
    //     var text = ([] = textsnap.child("text").val());
    //     ques.push(text);
    //   });
    //   console.log(ques);
    //   // this.state.question = ques;
    //   // console.log(this.state.question);
    //   thisRef.setState({ question: ques });
    // });

    // var db = firebase.database().ref("/questions/");
    // if (this.state.newContent != "")
    //   db.push({
    //     user: this.state.userName,
    //     id: this.state.id,
    //     text: this.state.newContent
    //   });
    // db.orderByKey().on("value", function(snapshot) {
    //   var ques = [];
    //   snapshot.forEach(function(snap) {
    //     var text = snap.child("text").val();
    //     var name = snap.child("user").val();
    //     var ob = { name, text };
    //     ques.push(ob);
    //   });
    //   console.log(ques);
    //   thisRef.setState({ question: ques });
    // });
  }

  arrayrender() {
    let nav = this.props.navigation;
    console.log(this.props.navigation);
    var ques = this.props.record["record"];
    var name = this.state.userName;
    return ques.map(function(el, i) {
      return (
        <View key={i}>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require("../img/Q.jpg")} />
            </Left>
            <Body>
              <Text>{el.name}</Text>
              <Text note>{el.text}</Text>
            </Body>
            <Right>
              <Icon
                name="paper"
                onPress={() => {
                  console.log(el.text);
                  const { navigate } = nav;
                  navigate("Answer", {
                    data: el.text,
                    key: el.key,
                    user: name,
                    asked: el.name
                  });
                }}
              />
              <Text note>1:20 pm</Text>
            </Right>
          </ListItem>
        </View>
      );
    });
  }
  render() {
    return (
      <View>
        <View>
          <List style={{}}>
            <ListItem avatar style={{ marginTop: 10 }}>
              <Left>
                <Thumbnail source={require("../img/img_lights.jpg")} />
              </Left>
              <Body>
                <Text>{this.state.userName}</Text>
              </Body>
              <Right />
            </ListItem>
          </List>
        </View>
        <Form>
          <Item stackedLabel>
            {/* <Label>Your Answer:</Label> */}
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%"
              }}
            >
              <Input
                style={{
                  flex: 1,
                  width: "100%",
                  fontSize: 20,
                  alignContent: "flex-start",
                  justifyContent: "flex-start",
                  textAlignVertical: "top",
                  margin: 5
                }}
                value={this.state.value}
                multiline
                placeholder="What is your question?"
                onChangeText={text =>
                  this.setState({
                    newContent: text,
                    value: text
                  })}
              />
            </View>
            <Button
              bordered
              danger
              style={{ marginLeft: 270, height: 20 }}
              onPress={() => this.postContent()}
            >
              <Text>ASK</Text>
            </Button>
          </Item>
        </Form>
        {/* <Form>
          <Input placeholder="Enter" />
        </Form>
        <Button onPress={() => this.props.increment()}>
          <Text>click</Text>
        </Button> */}
        <List>
          <ScrollView>{this.arrayrender()}</ScrollView>
        </List>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    record: state.record
  };
}
// function matchDispatchToProps(dispatch) {
//   return bindActionCreators(
//     { increment: increment, decrement: decrement, fetchrecord: fetchrecord },
//     dispatch
//   );, matchDispatchToProps
// }
export default connect(mapStateToProps)(UserHome);
