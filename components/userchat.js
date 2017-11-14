import React from "react";
import {} from "react-native";
import {
  Left,
  Right,
  Body,
  View,
  Icon,
  Text,
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem
} from "native-base";
import { CurrentUser, getAllUsers } from "../firebasemethods";

class UserChat extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    Alluser: [],
    userid: ""
  };

  componentWillMount() {
    var thisref = this;
    var Allusers = [];
    var user = CurrentUser();
    if (user) {
      this.state.userid = user.uid;
    }

    var db = getAllUsers();
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(snap) {
          var key = snap.key;
          var name = snap.child("user").val();
          var image = snap.child("image").val();
          var ob = { key, name, image };
          Allusers.push(ob);
          if (Allusers.length === snapshot.numChildren()) {
            thisref.setState({
              Alluser: Allusers
            });
          }
        });
      })
      .catch(error => {});
  }

  arrayrender() {
    let nav = this.props.navigation;
    let thisref = this;

    return this.state.Alluser.map(function(el, i) {
      if (thisref.state.userid != el.key) {
        return (
          <ListItem
            key={i}
            avatar
            onPress={() => {
              const { navigate } = nav;
              navigate("Chat", { key: el.key, name: el.name, image: el.image });
            }}
          >
            <Left>
              <Thumbnail source={{ uri: el.image }} />
            </Left>
            <Body>
              <Text>{el.name}</Text>
            </Body>
            {/* <Right> */}

            <Icon
              style={{
                marginRight: 10,
                fontSize: 20
              }}
              name="ios-text-outline"
              onPress={() => {
                const { navigate } = nav;
                navigate("Chat", { key: el.key, name: el.name });
              }}
            />
            {/* </Right> */}
          </ListItem>
        );
      }
    });
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Chat List</Text>
          </CardItem>
        </Card>
        <List>{this.arrayrender()}</List>
      </View>
    );
  }
}

export default UserChat;
