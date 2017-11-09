import React from "react";
import { ScrollView, ListView } from "react-native";

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
import { CurrentUser, deleteUserAnswerDatabase } from "../firebasemethods";
import { connect } from "react-redux";
import { fetchquesans } from "../actions";

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
    var user = CurrentUser();
    if (user != null) {
      this.state.userName = user.displayName;
      this.state.email = user.email;
      this.state.uid = user.uid;
    }
    this.props.dispatch(
      fetchquesans({
        uid: this.state.uid
      })
    );
  }

  deleteAnswer(ob) {
    deleteUserAnswerDatabase(ob);
    this.props.dispatch(
      fetchquesans({
        uid: this.state.uid
      })
    );
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
          <Card style={{ flex: 1 }}>
            <CardItem header>
              <Text>Answer done by you</Text>
            </CardItem>
          </Card>

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
