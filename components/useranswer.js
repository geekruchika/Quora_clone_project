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
  TabHeading,
  List,
  ListItem,
  ScrollView,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import { MonoText } from "../components/StyledText";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import rootsaga from "../sagas/sagas";

class UserAnswer extends React.Component {
  state = {
    userName: "",
    email: "",
    uid: "",

    ques_ans: [],
    record: []
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

    this.props.dispatch({ type: "START_CONTENT" });
  }

  componentDidMount() {
    var db = firebase.database().ref("/questions/");
    var ob = [];
    var uid = this.state.uid;
    var ques_ans = [];
    var thisref = this;
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(snap) {
          var keyques = snap.key;
          var ans = snap.child("answer");
          var ques = snap.child("text").val();
          var ob = [];
          ans.forEach(function(text) {
            var key = text.key;
            var id = text.child("id").val();
            var val = text.child("answer").val();
            if (uid === id) {
              ob.push({ val, key, keyques });
            }
          });
          // console.log(ques);
          // console.log(ob);
          if (ob.length > 0) {
            var data = { ques, ob };
            ques_ans.push(data);
          }
        });
        console.log(ques_ans);
        thisref.setState({ ques_ans: ques_ans });
      });
  }

  deleteQuestion(ob) {
    console.log(ob);
    var onComplete = function(error) {
      if (error) {
        console.log("Synchronization failed");
      } else {
        console.log("Synchronization succeeded");
      }
    };

    var db = firebase.database().ref("/questions/" + ob.key);
    db.remove(onComplete);
    // this.props.dispatch({ type: "START_CONTENT" });
  }

  arrayrender() {
    var ques = this.props.record["record"];
    var name = this.state.userName;
    var uid = this.state.uid;
    let thisref = this;
    return ques.map(function(el, i) {
      //console.log(el.id, uid);
      if (uid == el.id) {
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
                <Icon name="pint" onPress={() => thisref.deleteQuestion(el)} />
                <Text note>Delete</Text>
              </Right>
            </ListItem>
          </View>
        );
      }
    });
  }

  deleteAnswer(ob) {
    console.log(ob);

    var db = firebase
      .database()
      .ref("/questions/" + ob.keyques + "/answer/" + ob.key);
    db.remove();
    this.props.dispatch({ type: "START_CONTENT" });
  }

  test(el, thisref) {
    //var thisref = this;
    return el.map(function(item, i) {
      console.log("check" + item.key);
      return (
        <View key={i}>
          <ListItem>
            <Body>
              <Text>{item.val}</Text>
            </Body>
            <Right>
              <Icon name="pint" onPress={() => thisref.deleteAnswer(item)} />
              <Text note>Delete</Text>
            </Right>
          </ListItem>
        </View>
      );
    });
  }

  arrayforanswer() {
    var ques = this.state.ques_ans;
    let thisref = this;

    return ques.map(function(el, i) {
      console.log(el);
      return (
        <View key={i}>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require("../img/Q.jpg")} />
            </Left>
            <Body>
              <Text>{el.ques}</Text>
            </Body>
            <Right />
          </ListItem>
          <List>{thisref.test(el.ob, thisref)}</List>
        </View>
      );
    });
  }

  render() {
    // console.log(this.state.record["answer"]);
    return (
      <View>
        <Card>
          <CardItem>
            <Text>{this.state.userName}</Text>
          </CardItem>
        </Card>
        <List>{this.arrayrender()}</List>
        <Card>
          <CardItem header>
            <Text>Answer done by you</Text>
          </CardItem>
        </Card>

        <List>{this.arrayforanswer()}</List>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    record: state.record,
    answer: state.answer
  };
}

export default connect(mapStateToProps)(UserAnswer);
