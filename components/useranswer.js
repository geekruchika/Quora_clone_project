import React, { Component } from "react";
import { ScrollView, StyleSheet, ListView } from "react-native";
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
  Button
} from "native-base";
import { NavigationActions } from "react-navigation";
import {
  CurrentUser,
  deleteUserQuesDatabase,
  deleteUserAnswerDatabase
} from "../firebasemethods";
import { connect } from "react-redux";
import { fetchrecord } from "../actions";

class UserAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    //this.dataSource = ds.cloneWithRows(this.props.ques_ans.ques_ans);
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
    var name, email, uid;
    var user = CurrentUser();
    if (user != null) {
      this.state.userName = user.displayName;
      this.state.email = user.email;
      this.state.uid = user.uid;
    }

    this.props.dispatch(fetchrecord());
  }

  deleteQuestion(ob) {
    deleteUserQuesDatabase(ob);
    this.props.dispatch(fetchrecord());
  }

  arrayrender() {
    var ques = this.props.record["record"];

    var uid = this.state.uid;
    let thisref = this;
    return ques.map(function(el, i) {
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Card style={{ flex: 1, flexDirection: "row" }}>
            <CardItem style={{ flex: 9 }}>
              <Left>
                <Text>{this.state.userName}</Text>
              </Left>
            </CardItem>
            <Icon style={{ flex: 1 }} name="refresh" onPress={() => {}} />
          </Card>
        </View>

        <View style={{ flex: 8 }}>
          <ScrollView>
            <List>{this.arrayrender()}</List>
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            block
            danger
            style={{}}
            onPress={() => {
              const { navigate } = this.props.navigation;
              console.log(this.props.navigation);
              navigate("UserAns");
            }}
          >
            <Text>Answer done by you</Text>
          </Button>
        </View>

        {/* <View style={{ flex: 1 }}>
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
        </View> */}
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
