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

    // var db = firebase.database().ref("/messages/" + recevierUid + uid);
    // var thisref = this;
    // db
    //   .orderByKey()
    //   .once("value")
    //   .then(function(snapshot) {
    //     var key = snapshot.key;
    //     var text = snapshot.child("message").val();
    //     thisref.setState({
    //       messages: text
    //       // senderKey: uid,
    //       // sender: name,
    //       // receiver: recevierName,
    //       // receiverKey: recevierUid
    //     });

    //     if (!snapshot.exists()) {
    //       thisref.setState({
    //         // sender: name,
    //         // receiver: recevierName,
    //         // senderKey: uid,
    //         // receiverKey: recevierUid,

    //         messages: [
    //           {
    //             _id: 1,
    //             text: "start chat",
    //             createdAt: new Date(),
    //             user: {
    //               _id: uid,
    //               name: name,
    //               avatar:
    //                 "/Users/ruchika/Sites/projects/quora-project/img/img_avatar.png"
    //             }
    //           }
    //         ]
    //       });
    //     }
    //   });
  }

  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.props.dispatch({
          type: "CHAT_CONTENT",
          payload: {
            senderkey: this.state.receiverKey,
            receiverkey: this.state.senderKey,
            message: this.state.messages
          }
        });
        //   var db = firebase
        //     .database()
        //     .ref("/messages/" + this.state.receiverKey + this.state.senderKey);

        //   db.set({
        //     message: this.state.messages
        //   });

        //   var db = firebase
        //     .database()
        //     .ref("/messages/" + this.state.senderKey + this.state.receiverKey);

        //   db.set({ message: this.state.messages });
      }
    );
  }

  render() {
    console.log(this.props.messages);
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
          messages={this.state.messages}
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
    messages: state.message
  };
}

export default connect(mapStateToProps)(chatScreen);

//export default chatScreen;
