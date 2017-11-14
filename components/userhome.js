import React from "react";
import {
  ScrollView,
  ListView,
  StyleSheet,
  Fab,
  FlatList,
  TouchableHighlight,
  Image
} from "react-native";
import {
  Button,
  View,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Input,
  Form,
  Item,
  List,
  ListItem,
  Thumbnail
} from "native-base";
//import { NavigationActions } from "react-navigation";
import { CurrentUser, AddUserToDatabase, QuesRef } from "../firebasemethods";
import { fetchrecord, postrecord, userRecord } from "../actions";
//import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";
import { firebase } from "../firebaseconfig";
class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.active = false;
    // this.ds = new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // });
    // this.dataSource = this.ds.cloneWithRows(this.props.record["record"]);
  }
  state = {
    newContent: "",
    userName: "",
    id: "",
    email: "",
    record: [],
    value: "",
    uri: "",

    user: [],
    toggle: false
  };

  componentWillMount() {
    console.ignoredYellowBox = ["Setting a timer"];
    var user = CurrentUser();
    if (user) {
      this.state.userName = user.displayName;
      this.state.email = user.email;
      this.state.id = user.uid;

      if (user.photoURL != null) this.state.uri = user.photoURL;
    }
    registerForPushNotificationsAsync(this.state.id);
  }

  componentDidMount() {
    AddUserToDatabase(
      this.state.id,
      this.state.userName,
      this.state.email,
      this.state.uri
      // this.props.user.user.image
    );
    var thisRef = this;
    var db = QuesRef();
    db.on("value", function() {
      thisRef.props.dispatch(fetchrecord());
      thisRef.props.dispatch(
        userRecord({
          name: thisRef.state.userName,
          email: thisRef.state.email,
          id: thisRef.state.id,
          image: thisRef.state.uri
        })
      );
    });
  }

  _keyExtractor = (item, index) => item.key;

  postContent() {
    this.setState({ value: "" });
    this.props.dispatch(
      postrecord({
        uid: this.state.id,
        user: this.state.userName,
        Content: this.state.newContent,
        photo: this.state.uri
      })
    );
  }

  toggleLike(key) {
    // var i = this.state.toggle;
    // console.log(this.state.toggle);
    // this.setState({ toggle: !i });
    console.log(key);
    var thisRef = this;
    var db = firebase.database().ref("/questions/" + key + "/likes_id/");
    var flag = 1;
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        var key = snapshot.key;
        console.log(key);
        // db.push({ like: thisRef.state.id });
        snapshot.forEach(function(snap) {
          var like = snap.child("like").val();
          console.log(like);
          if (like == thisRef.state.id) {
            console.log(snap.key);
            db = db.child(snap.key);
            db.remove();
            flag = 0;
          }
        });
        if (flag == 1) {
          db.push({ like: thisRef.state.id });
        }
      });
  }

  render() {
    //console.log("render" + this.state.toggle);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <List>
            <ListItem avatar style={{ marginTop: 10 }}>
              <Left>
                {/* <Thumbnail source={require("../img/img_lights.jpg")} /> */}
                <Thumbnail source={{ uri: this.props.user.user.image }} />
              </Left>
              <Body>
                <Text>{this.state.userName}</Text>
              </Body>
              <Right />
            </ListItem>
          </List>
        </View>

        <View style={{ flex: 2, marginTop: 20 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Form style={{ flex: 8, margin: 10 }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Input
                  style={styles.input}
                  value={this.state.value}
                  multiline
                  placeholder="What is your question?"
                  onChangeText={text =>
                    this.setState({
                      newContent: text,
                      value: text
                    })
                  }
                />
              </Item>
            </Form>
            <Button
              transparent
              danger
              style={styles.button}
              onPress={() => this.postContent()}
            >
              <Text>ASK</Text>
            </Button>
          </View>
        </View>
        <View style={{ flex: 8, borderStyle: "solid" }}>
          {/* <List>{this.arrayrender()}</List> */}

          <View style={{ justifyContent: "flex-start" }}>
            <FlatList
              data={this.props.record["record"].reverse()}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => (
                <View style={styles.view}>
                  <TouchableHighlight
                    onPress={() => {}}
                    underlayColor="white"
                    activeOpacity={0.75}
                  >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Thumbnail source={{ uri: item.photo }} />
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "flex-start"
                        }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontWeight: "bold",
                            fontSize: 20
                          }}
                        >
                          {item.name}
                        </Text>

                        <Text
                          style={{
                            paddingLeft: 15,
                            color: "#aaa",
                            fontSize: 16
                          }}
                        >
                          {"##" + item.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                  <Text style={styles.Text}>{item.text}</Text>
                  <View style={styles.Footer}>
                    <View style={styles.footerIcons}>
                      <Button
                        transparent
                        dark
                        onPress={() => {
                          var nav = this.props.navigation;
                          const { navigate } = nav;
                          navigate("Answer", {
                            data: item.text,
                            key: item.key,
                            user: this.state.userName,
                            asked: item.name
                          });
                        }}
                      >
                        <Icon name="paper" />
                        <Text style={styles.badgeCount}>{item.totalans}</Text>
                      </Button>
                    </View>
                    {/* <View style={styles.footerIcons}>
                        <Button transparent dark>
                          <Icon name="ios-repeat" />
                          <Text style={styles.badgeCount}></Text>
                        </Button>
                      </View> */}
                    <View style={styles.footerIcons}>
                      <Button
                        dark
                        transparent
                        onPress={() => {
                          this.active = false;
                          var thisRef = this;
                          item.check.forEach(function(el) {
                            if (el.like == thisRef.state.id) {
                              this.active = true;
                            }
                          });
                          console.log(this.active);
                          this.toggleLike(item.key);
                        }}
                      >
                        <Icon active={this.active} name="thumbs-up" />
                        <Text style={styles.badgeCount}>{item.like}</Text>
                      </Button>
                    </View>
                    <View style={styles.footerIcons}>
                      <Button
                        transparent
                        dark
                        onPress={() => {
                          var nav = this.props.navigation;
                          const { navigate } = nav;
                          navigate("Chat", {
                            key: item.key,
                            name: item.name
                          });
                        }}
                      >
                        <Icon name="ios-mail-outline" />
                      </Button>
                    </View>
                  </View>
                </View>
              )}
            />
            {/* <View style={styles.footerIcons}>
              <Button dark transparent onPress={this.toggleLike}>
                <Icon active={this.state.toggle} name="thumbs-up" />
                <Text style={styles.badgeCount}>
                  {this.state.toggle ? "true" : "false"}
                </Text>
              </Button>
            </View> */}
          </View>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    record: state.record,
    user: state.user
  };
}

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchrecord: fetchrecord }, dispatch);
// }, matchDispatchToProps
export default connect(mapStateToProps)(UserHome);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 20,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    margin: 5
  },
  button: { flex: 2, height: 30, marginTop: 40 },

  topMargin: {
    backgroundColor: "white",
    zIndex: -1
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  view: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column"
  },
  Text: {
    marginTop: 10,
    fontSize: 18,
    color: "#555"
  },
  Footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  }
});
