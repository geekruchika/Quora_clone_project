import React from "react";
import {} from "react-native";
import {
  Container,
  Header,
  Title,
  Footer,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Thumbnail
} from "native-base";

//import { NavigationActions } from "react-navigation";
import {
  CurrentUser,
  pushNotificationToOther,
  chatReference
} from "../firebasemethods";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { connect } from "react-redux";
import { fetchChatRecord, fetchRenderChatRecord } from "../actions";
import { Notifications } from "expo";
// import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";

const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

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
    messages: [],
    notification: null
  };

  componentWillMount() {
    //receiver data
    var recevierName = this.props.navigation.state.params.name;
    var recevierUid = this.props.navigation.state.params.key;
    var name, uid;
    // sender data
    var user = CurrentUser();
    if (user != null) {
      name = user.displayName;
      uid = user.uid;
    }
    this.state.senderKey = uid;
    this.state.sender = name;
    this.state.receiverKey = recevierUid;
    this.state.receiver = recevierName;

    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentDidMount() {
    var thisRef = this;
    var db = chatReference(this.state.senderKey, this.state.receiverKey);

    db.on("value", function(dataSnapshot) {
      thisRef.props.dispatch(
        fetchChatRecord({
          senderkey: thisRef.state.senderKey,
          receiverkey: thisRef.state.receiverKey
        })
      );
    });
  }
  _registerForPushNotifications() {
    //Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    //console.log(data);
  };

  onSend(messages = []) {
    this.props.dispatch(
      fetchRenderChatRecord({
        senderkey: this.state.senderKey,
        receiverkey: this.state.receiverKey,
        message: GiftedChat.append(this.props.messages["messages"], messages)
      })
    );
    var thisRef = this;
    var db = pushNotificationToOther(this.state.receiverKey);
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        var token = snapshot.child("token").val();
        //console.log(token);
        fetch(PUSH_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            to: token,
            // data: [
            //   {
            //     recevier: thisRef.state.receiverKey,
            //     Name: thisRef.state.receiver
            //   }
            // ],
            title: "Quora",
            body: "Message for you"
            //badge: 4
          })
        })
          .then(() => {
            console.log("success");
          })
          .catch(err => {
            console.log(err, "logging post error");
          });
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Thumbnail
              source={{ uri: this.props.navigation.state.params.image }}
            />
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
          showUserAvatar={true}
        />

        <KeyboardSpacer />
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
