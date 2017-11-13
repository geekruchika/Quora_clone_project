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

class UserHome extends React.Component {
  constructor(props) {
    super(props);
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
    toggle: false,
    user: []
  };

  componentWillMount() {
    console.ignoredYellowBox = ["Setting a timer"];
    var user = CurrentUser();
    if (user) {
      this.state.userName = user.displayName;
      this.state.email = user.email;
      this.state.id = user.uid;
      this.state.uri = user.photoURL;
    }
    registerForPushNotificationsAsync(this.state.id);
  }

  componentDidMount() {
    AddUserToDatabase(this.state.id, this.state.userName, this.state.email);
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

  render() {
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
              data={this.props.record["record"]}
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
                        transparent
                        dark
                        onPress={() => {
                          //console.log(this.state.toggle);
                          {
                            /* if (this.state.toggle == false) {
                            this.setState({
                              toggle: true
                            });
                          } else this.setState({ toggle: false }); */
                          }
                        }}
                      >
                        {this.state.toggle ? (
                          <Icon active name="thumbs-up" />
                        ) : (
                          <Icon name="thumbs-up" />
                        )}

                        <Text style={styles.badgeCount}>1</Text>
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
