import React from "react";
import {
  ScrollView,
  ListView,
  StyleSheet,
  Fab,
  FlatList,
  TouchableHighlight
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
import { CurrentUser, AddUserToDatabase } from "../firebasemethods";
import { fetchrecord, postrecord } from "../actions";
//import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = this.ds.cloneWithRows(this.props.record["record"]);
  }
  state = {
    newContent: "",
    userName: "",
    id: "",
    email: "",
    question: [],
    value: ""
  };

  componentWillMount() {
    console.ignoredYellowBox = ["Setting a timer"];
    var user = CurrentUser();
    if (user) {
      this.state.userName = user.displayName;
      this.state.email = user.email;
      this.state.id = user.uid;
      AddUserToDatabase(user.uid, user.displayName, user.email);
    }

    this.props.dispatch(fetchrecord());
  }

  _keyExtractor = (item, index) => item.key;

  postContent() {
    this.setState({ value: "" });
    this.props.dispatch(
      postrecord({
        uid: this.state.id,
        user: this.state.userName,
        Content: this.state.newContent
      })
    );
  }

  // arrayrender() {
  //   let nav = this.props.navigation;
  //   var ques = this.props.record["record"];
  //   var name = this.state.userName;
  //   //ques.reverse();
  //   return ques.map(function(el, i) {
  //     return (
  //       <ListItem
  //         key={i}
  //         avatar
  //         onPress={() => {
  //           console.log(el.text);
  //           const { navigate } = nav;
  //           navigate("Answer", {
  //             data: el.text,
  //             key: el.key,
  //             user: name,
  //             asked: el.name
  //           });
  //         }}
  //       >
  //         <Left>
  //           <Thumbnail source={require("../img/Q.jpg")} />
  //         </Left>
  //         <Body>
  //           <Text>{el.name}</Text>
  //           <Text note>{el.text}</Text>
  //         </Body>
  //         <Right>
  //           <Icon
  //             name="paper"
  //             onPress={() => {
  //               console.log(el.text);
  //               const { navigate } = nav;
  //               navigate("Answer", {
  //                 data: el.text,
  //                 key: el.key,
  //                 user: name,
  //                 asked: el.name
  //               });
  //             }}
  //           />
  //           <Text note>1:20 pm</Text>
  //         </Right>
  //       </ListItem>
  //     );
  //   });
  // }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <List>
            <ListItem avatar style={{ marginTop: 10 }}>
              <Left>
                <Thumbnail source={require("../img/img_lights.jpg")} />
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
                      <Thumbnail source={require("../img/Q.jpg")} />
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
                          //console.log(el.text);
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
                      <Button transparent dark>
                        <Icon name="thumbs-up" />
                        <Text style={styles.badgeCount}>{item.likes}</Text>
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
            {/* {this.state.newTweetModalOpen ? null : (
                <Fab
                  position="bottomRight"
                  style={{ backgroundColor: "#4286f4", zIndex: -1 }}
                  onPress={this.openModal.bind(this)}
                  ref={"FAB"}
                >
                  <Icon name="md-create" />
                </Fab>
              )} */}
          </View>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    record: state.record
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
    // marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
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
  // modalFooter: {
  //   backgroundColor: "white",
  //   elevation: 3,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 0.2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 2,
  //   height: 54,
  //   width: "100%",
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   padding: 5
  // },
  // modal: {
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   position: "absolute",
  //   zIndex: 4,
  //   elevation: 4
  //height: Dimensions.get("window").height - Expo.Constants.statusBarHeight,
  //marginTop: Expo.Constants.statusBarHeight / 2
  //}
});
