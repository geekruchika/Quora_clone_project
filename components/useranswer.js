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
  Thumbnail
} from "native-base";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import rootsaga from "../sagas/sagas";

class UserAnswer extends React.Component {
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

    this.props.dispatch({ type: "START_CONTENT" });
  }

  deleteQuestion(ob) {
    // console.log(ob);
    var onComplete = function(error) {
      if (error) {
        console.log("Synchronization failed");
      } else {
        console.log("Synchronization succeeded");
      }
    };

    var db = firebase.database().ref("/questions/" + ob.key);
    db.remove(onComplete);
    this.props.dispatch({ type: "START_CONTENT" });
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
    //console.log(ob);

    var db = firebase
      .database()
      .ref("/questions/" + ob.keyques + "/answer/" + ob.key);
    db.remove();
    //this.props.dispatch({ type: "START_CONTENT" });
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
        <ListItem key={i} avatar>
          <Left>
            <Text>Me:</Text>
          </Left>
          <Body>
            <Text>{item.val}</Text>
          </Body>
          <Right>
            <Icon name="pint" onPress={() => thisref.deleteAnswer(item)} />
            <Text note>Delete</Text>
          </Right>
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
    //console.log(this.props.answer);
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Card style={{ flex: 1, flexDirection: "row" }}>
            <CardItem style={{ flex: 9 }}>
              <Left>
                <Text>{this.state.userName}</Text>
              </Left>
            </CardItem>
            <Icon
              style={{ flex: 1 }}
              name="refresh"
              onPress={() => {
                this.props.dispatch({
                  type: "QUES_ANS_CONTENT",
                  payload: {
                    uid: this.state.uid
                  }
                });
              }}
            />
          </Card>
        </View>

        <View style={{ flex: 4 }}>
          <ScrollView>
            <List>{this.arrayrender()}</List>
          </ScrollView>
        </View>

        <View style={{ flex: 1 }}>
          <Card style={{ borderColor: "red" }}>
            <CardItem header>
              <Text>Answer done by you</Text>
            </CardItem>
          </Card>
        </View>

        <View style={{ flex: 4 }}>
          <ScrollView>
            <List>{this.arrayforanswer()}</List>
          </ScrollView>
        </View>
        {/* <ListView
            //style={styles.container}
            dataSource={this.ds.cloneWithRows(this.props.ques_ans.ques_ans)}
            renderRow={data => (
              <View>
                {this.arrayforanswer(data)}
              </View>
            )}
            enableEmptySections={true}
          /> */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    record: state.record,
    ques_ans: state.ques_ans,
    answer: state.record.answer
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});
export default connect(mapStateToProps, null)(UserAnswer);
