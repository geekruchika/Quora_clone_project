import React, { Component } from "react";
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import {
  View,
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
import { GiftedChat } from "react-native-gifted-chat";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import rootsaga from "../sagas/sagas";
class chatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
  }
  state = {
    sender: "",
    receiver: "",
    senderKey: "",
    receiverKey: "",
    messages: []
  };

  componentWillMount() {
    //receiver data
    var recevierName = this.props.navigation.state.params.name;
    var recevierUid = this.props.navigation.state.params.key;
    var name, uid;
    // sender data
    var user = firebase.auth().currentUser;
    if (user != null) {
      name = user.displayName;
      uid = user.uid;
    }

    this.setState(
      {
        senderKey: uid,
        sender: name,
        receiver: recevierName,
        receiverKey: recevierUid
      },
      () => {
        this.props.dispatch({
          type: "CHAT_CONTENT_GET",
          payload: {
            senderkey: this.state.receiverKey,
            receiverkey: this.state.senderKey
            // message: this.state.messages
          }
        });
      }
    );
  }

  onSend(messages = []) {
    // this.setState(
    //   previousState => ({
    //     messages: GiftedChat.append(previousState.messages, messages)
    //   }),
    //   () => {
    //     this.props.dispatch({
    //       type: "CHAT_CONTENT",
    //       payload: {
    //         senderkey: this.state.receiverKey,
    //         receiverkey: this.state.senderKey,
    //         message: this.state.messages
    //       }
    //     });
    //   }
    // );

    // this.props.messages = GiftedChat.append(this.props.messages, messages);
    this.props.dispatch({
      type: "CHAT_CONTENT",
      payload: {
        senderkey: this.state.receiverKey,
        receiverkey: this.state.senderKey,
        message: GiftedChat.append(this.props.messages["messages"], messages)
      }
    });
  }

  render() {
    console.log(this.props.messages["messages"]);
    return (
      <Container>
        <Header>
          <Left>
            <Thumbnail source={require("../img/img_lights.jpg")} />
          </Left>
          <Body>
            <Title>{this.state.receiver}</Title>
          </Body>
          <Right />
        </Header>
        <GiftedChat
          messages={this.props.messages["messages"]}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.senderKey,
            name: this.state.sender,
            avatar:
              "/Users/ruchika/Sites/projects/quora-project/img/img_avatar.png"
          }}
        />
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
    messages: state.messages
  };
}

export default connect(mapStateToProps)(chatScreen);

//export default chatScreen;
