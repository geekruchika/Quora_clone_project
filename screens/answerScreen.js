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

class AnswerScreen extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }
  state = {
    value: "",
    ques_key: "",
    ques_text: "",
    ans_text: "",
    user: "",
    answer: []
  };

  componentWillMount() {
    var data = this.props.navigation.state.params.data;
    var key = this.props.navigation.state.params.key;
    var thisRef = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var id1 = user.uid;
        thisRef.setState({ user: displayName, ques_key: key, ques_text: data });
      }
    });

    this.props.dispatch({
      type: "ANS_CONTENT",
      payload: {
        key: key
      }
    });
  }

  componentDidMount() {}

  addAnswer() {
    this.setState({ value: "" });
    this.props.dispatch({
      type: "ANSWER_CONTENT",
      payload: {
        key: this.state.ques_key,
        ques: this.state.ques_text,
        answer: this.state.ans_text,
        user: this.state.user
      }
    });
  }

  arrayrender() {
    var ans = this.props.record["answer"];

    return ans.map(function(el, i) {
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
              <Text note>1:20 pm</Text>
            </Right>
          </ListItem>
        </View>
      );
    });
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <Content>
          <View>
            <Card>
              <CardItem header>
                <Text>{this.props.navigation.state.params.user}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{this.state.ques_text}</Text>
                </Body>
              </CardItem>
              <CardItem footer style={{ justifyContent: "flex-end" }}>
                <Text>by {this.props.navigation.state.params.asked}</Text>
              </CardItem>
            </Card>

            <Form>
              <Item stackedLabel>
                <Label>Your Answer:</Label>
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
                      fontSize: 24,
                      alignContent: "flex-start",
                      justifyContent: "flex-start",
                      textAlignVertical: "top",
                      margin: 5
                    }}
                    value={this.state.value}
                    multiline
                    placeholder="Answer here?"
                    blurOnSubmit={true}
                    onChangeText={text =>
                      this.setState({
                        ans_text: text,
                        value: text
                      })}
                  />

                  <Button
                    transparent
                    danger
                    style={{ marginLeft: 240 }}
                    onPress={() => this.addAnswer()}
                  >
                    <Icon name="paper-plane" style={{ marginRight: 0 }} />
                    <Text style={{ paddingRight: 5 }}>Submit</Text>
                  </Button>
                </View>
              </Item>
            </Form>

            <List>
              <ScrollView>{this.arrayrender()}</ScrollView>
            </List>
          </View>
        </Content>
        <Footer>
          <Button
            transparent
            danger
            style={{ width: 50, height: 50 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="arrow-back" />
          </Button>
        </Footer>
      </Container>
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
export default connect(mapStateToProps)(AnswerScreen);

//export default AnswerScreen;
