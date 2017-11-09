import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  View,
  Footer,
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
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem
} from "native-base";

import { NavigationActions } from "react-navigation";
import { CurrentUser } from "../firebasemethods";
import { connect } from "react-redux";
import { fetchAnsRecord, fetchRenderAnsRecord } from "../actions";

class AnswerScreen extends React.Component {
  state = {
    value: "",
    ques_key: "",
    ques_text: "",
    ans_text: "",
    user: "",
    answer: [],
    id: ""
  };

  componentWillMount() {
    var data = this.props.navigation.state.params.data;
    var key = this.props.navigation.state.params.key;
    var thisRef = this;
    var user = CurrentUser();

    if (user) {
      this.state.user = user.displayName;
      this.state.id = user.uid;
      this.state.ques_key = key;
      this.state.ques_text = data;
    }

    this.props.dispatch(
      fetchAnsRecord({
        key: key
      })
    );
  }

  addAnswer() {
    this.setState({ value: "" });
    this.props.dispatch(
      fetchRenderAnsRecord({
        key: this.state.ques_key,
        ques: this.state.ques_text,
        answer: this.state.ans_text,
        user: this.state.user,
        id: this.state.id
      })
    );
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
            <Right style={{ paddingBottom: 0 }}>
              <Button transparent>
                <Icon active name="thumbs-up" />
              </Button>
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
        <Header />
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
                <View style={styles.view}>
                  <Input
                    style={styles.input}
                    value={this.state.value}
                    multiline
                    placeholder="Answer here?"
                    blurOnSubmit={true}
                    onChangeText={text =>
                      this.setState({
                        ans_text: text,
                        value: text
                      })
                    }
                  />

                  <Button
                    transparent
                    danger
                    style={styles.button}
                    onPress={() => this.addAnswer()}
                  >
                    <Icon name="paper-plane" style={{ marginRight: 0 }} />
                    <Text style={{ paddingRight: 5 }}>Submit</Text>
                  </Button>
                </View>
              </Item>
            </Form>

            <List>{this.arrayrender()}</List>
          </View>
        </Content>
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
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    record: state.record
  };
}

export default connect(mapStateToProps)(AnswerScreen);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: "100%",
    fontSize: 24,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    margin: 5
  },
  button: { marginLeft: 240 },
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  }
});
