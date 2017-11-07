import React, { Component } from "react";
import { ScrollView, StyleSheet, ListView, RefreshControl } from "react-native";
import InfiniteScrollView from "react-native-infinite-scroll-view";

import {
  Left,
  Right,
  Body,
  View,
  Icon,
  Text,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Header,
  Footer,
  Button
} from "native-base";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import rootsaga from "../sagas/sagas";

class Ans_Ques extends React.Component {
  constructor(props) {
    super(props);
    this.arrayforanswer = this.arrayforanswer.bind(this);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    // this.dataSource = ds.cloneWithRows(this.props.ques_ans.ques_ans);
  }

  state = {
    userName: "",
    email: "",
    uid: "",
    answer: [],
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
    this.setState(
      {
        userName: name,
        email: email,
        uid: uid
      },
      () => {
        this.props.dispatch({
          type: "QUES_ANS_CONTENT",
          payload: {
            uid: this.state.uid
          }
        });
      }
    );
  }

  deleteAnswer(ob) {
    var db = firebase
      .database()
      .ref("/questions/" + ob.keyques + "/answer/" + ob.key);
    db.remove();

    this.props.dispatch({
      type: "QUES_ANS_CONTENT",
      payload: {
        uid: this.state.uid
      }
    });
  }

  test(el, thisref) {
    return el.map(function(item, i) {
      return (
        <ListItem key={i} avatar style={{ borderStyle: "solid" }}>
          <Left>
            <Text>Me:</Text>
          </Left>
          <Body>
            <Text>{item.val}</Text>
          </Body>
          {/* <Right> */}
          <Button
            transparent
            danger
            style={{ paddingBottom: 0, paddingTop: 0 }}
            onPress={() => thisref.deleteAnswer(item)}
          >
            {/* <Icon name="pint" /> */}
            <Text>X</Text>
          </Button>
          {/* </Right> */}
        </ListItem>
      );
    });
  }

  arrayforanswer() {
    var ques = this.props.ques_ans.ques_ans;
    let thisref = this;
    console.log(ques);
    return ques.map(function(el, i) {
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
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1 }}>
          {/* <View style={{ flex: 1 }}> */}
          <Card style={{ flex: 1 }}>
            <CardItem header>
              <Text>Answer done by you</Text>
            </CardItem>
          </Card>
          {/* </View> */}

          <View style={{ flex: 9, backgroundColor: "#FFFFFF" }}>
            <ScrollView>
              <List>{this.arrayforanswer()}</List>
            </ScrollView>
          </View>
        </View>
        <Footer style={{ backgroundColor: "#FFFFFF" }}>
          <Button
            transparent
            danger
            style={{ width: 50, height: 50 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="arrow-back" />
          </Button>
        </Footer>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    ques_ans: state.ques_ans
  };
}

export default connect(mapStateToProps, null)(Ans_Ques);
