import React from "react";
import {
  ScrollView,
  ListView,
  StyleSheet,
  Fab,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions
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
  Label,
  ListItem,
  Thumbnail,
  Title,
  Header,
  Footer
} from "native-base";
//import { NavigationActions } from "react-navigation";
import { CurrentUser, AddUserToDatabase, QuesRef } from "../firebasemethods";
import { fetchrecord, postrecord, userRecord } from "../actions";
//import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";
import { firebase } from "../firebaseconfig";
import Modal from "react-native-modal";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.active = false;
    this._toggleProfile = this._toggleProfile.bind(this);
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
      thisRef.props.dispatch(fetchrecord({ uid: thisRef.state.id }));
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
  handletext = text => {
    this.setState({
      newContent: text,
      value: text
    });
  };
  _keyExtractor = (item, index) => item.key;

  postContent() {
    this._toggleModal();
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
  _toggleModal = () =>
    this.setState({
      string: "",
      isModalVisible: !this.state.isModalVisible
    });
  _toggleProfile(item) {
    this.setState({
      name: item.name,
      image: item.photo,
      isprofileVisible: !this.state.isprofileVisible
    });
  }
  // _toggleModaloff() {
  //   this.setState({ isprofileVisible: false });
  // }
  toggleLike(key) {
    var thisRef = this;
    var db = firebase.database().ref("/questions/" + key + "/likes_id/");
    var flag = 1;
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        var key = snapshot.key;

        snapshot.forEach(function(snap) {
          var like = snap.child("like").val();

          if (like == thisRef.state.id) {
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
    return (
      <View>
        <View
          style={{
            height: 100,
            width: deviceWidth,
            borderColor: "grey",
            borderWidth: 1
          }}
        >
          <View style={{ flexDirection: "row", width: deviceWidth }}>
            <Thumbnail source={{ uri: this.props.user.user.image }} />

            <Title style={{ marginLeft: 10 }}>
              <Item fixedLabel last style={{ height: 60, width: deviceWidth }}>
                <Label onPress={this._toggleModal}>Write Something</Label>
              </Item>
            </Title>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderTopWidth: 2,
              borderTopColor: "#E9F2F6"
            }}
          >
            <Button transparent style={{ alignItems: "center" }}>
              <Icon style={{ color: "#d9534f" }} name="film" />
            </Button>
            <Button transparent style={{ alignItems: "center" }}>
              <Icon style={{ color: "#d9534f" }} name="camera" />
            </Button>
            <Button transparent style={{ alignItems: "center" }}>
              <Icon style={{ color: "#d9534f" }} name="paper" />
            </Button>
          </View>
          <Modal isVisible={this.state.isModalVisible}>
            <View
              style={
                {
                  height: 200,
                  backgroundColor: "white",
                  borderColor: "grey",
                  borderWidth: 1
                } //  width: deviceWidth,
              }
            >
              <Icon
                style={{ alignSelf: "flex-end", marginRight: 10 }}
                onPress={this._toggleModal}
                name="ios-close"
              />
              <Input
                placeholder="Write Something"
                multiline
                autoFocus
                onChangeText={this.handletext}
                value={this.state.value}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderTopWidth: 2,
                  borderTopColor: "#E9F2F6"
                }}
              >
                <Button transparent style={{ alignItems: "center" }}>
                  <Icon name="film" />
                </Button>
                <Button transparent style={{ alignItems: "center" }}>
                  <Icon name="camera" />
                </Button>
                <Button transparent style={{ alignItems: "center" }}>
                  <Icon name="paper" />
                </Button>
              </View>
              <Button full danger onPress={() => this.postContent()}>
                <Text>ASK</Text>
              </Button>
            </View>
          </Modal>
        </View>
        <View>
          <FlatList
            style={{ backgroundColor: "#F7F9F9" }}
            data={this.props.record["record"].reverse()}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <View style={styles.view}>
                <TouchableHighlight
                  onPress={() => this._toggleProfile(item)}
                  underlayColor="white"
                  activeOpacity={0.75}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      backgroundColor: "white",
                      borderRadius: 5
                    }}
                  >
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

                  <View style={styles.footerIcons}>
                    <Button
                      dark
                      transparent
                      onPress={() => {
                        this.toggleLike(item.key);
                      }}
                    >
                      <Icon active={item.like} name="thumbs-up" />
                      <Text style={styles.badgeCount}>{item.likecount}</Text>
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
          <Modal
            isVisible={this.state.isprofileVisible}
            onBackdropPress={this._toggleProfile}
          >
            <View style={{ height: 200, width: 200, alignSelf: "center" }}>
              <Image
                source={{ uri: this.state.image }}
                style={{ alignSelf: "center", height: 200, width: 200 }}
              >
                <Header style={{ backgroundColor: "black", opacity: 0.3 }}>
                  <Text
                    style={{
                      height: 20,
                      color: "white",
                      fontWeight: "bold",
                      marginLeft: 10
                    }}
                  >
                    {this.state.name}
                  </Text>
                </Header>
              </Image>
              <Footer
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <Icon name="ios-text-outline" />
                <Icon name="thumbs-up" />
                <Icon name="person" />
              </Footer>
            </View>
          </Modal>
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
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#d9534f",
    //borderTopWidth: 3,
    //borderBottomWidth: 3,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    // borderBottomColor: "#bbb",
    //borderTopColor: "#bbb",
    // borderBottomWidth: StyleSheet.hairlineWidth,
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

// render() {
//   return (
//     // <View style={{ flex: 1 }}>
//     <View style={{ flex: 1 }}>
//       <List>
//         <ListItem avatar style={{ margin: 10 }}>
//           <Left>
//             <Thumbnail source={{ uri: this.props.user.user.image }} />
//           </Left>
//           <Body>
//             <Text>{this.state.userName}</Text>
//           </Body>
//           <Right />
//         </ListItem>
//       </List>
//       {/* </View> */}

//       {/* <View style={{ flex: 2, marginTop: 20 }}> */}
//       <View style={{ flex: 1, flexDirection: "row" }}>
//         <Form style={{ flex: 8, margin: 10 }}>
//           <Item stackedLabel style={{ flex: 1 }}>
//             <Input
//               style={styles.input}
//               value={this.state.value}
//               multiline
//               placeholder="What is your question?"
//               onChangeText={text =>
//                 this.setState({
//                   newContent: text,
//                   value: text
//                 })
//               }
//             />
//           </Item>
//         </Form>
//         <Button
//           transparent
//           danger
//           style={styles.button}
//           onPress={() => this.postContent()}
//         >
//           <Text>ASK</Text>
//         </Button>
//       </View>
//       {/* </View> */}
//       <View style={{ flex: 8, borderStyle: "solid" }}>
//         {/* <List>{this.arrayrender()}</List> */}

//         <View style={{ justifyContent: "flex-start" }}>
//           <FlatList
//             data={this.props.record["record"].reverse()}
//             extraData={this.state}
//             keyExtractor={this._keyExtractor}
//             renderItem={({ item }) => (
//               <View style={styles.view}>
//                 <TouchableHighlight
//                   onPress={() => {}}
//                   underlayColor="white"
//                   activeOpacity={0.75}
//                 >
//                   <View style={{ flex: 1, flexDirection: "row" }}>
//                     <Thumbnail source={{ uri: item.photo }} />
//                     <View
//                       style={{
//                         flexDirection: "column",
//                         justifyContent: "flex-start"
//                       }}
//                     >
//                       <Text
//                         style={{
//                           paddingLeft: 15,
//                           fontWeight: "bold",
//                           fontSize: 20
//                         }}
//                       >
//                         {item.name}
//                       </Text>

//                       <Text
//                         style={{
//                           paddingLeft: 15,
//                           color: "#aaa",
//                           fontSize: 16
//                         }}
//                       >
//                         {"##" + item.name}
//                       </Text>
//                     </View>
//                   </View>
//                 </TouchableHighlight>
//                 <Text style={styles.Text}>{item.text}</Text>
//                 <View style={styles.Footer}>
//                   <View style={styles.footerIcons}>
//                     <Button
//                       transparent
//                       dark
//                       onPress={() => {
//                         var nav = this.props.navigation;
//                         const { navigate } = nav;
//                         navigate("Answer", {
//                           data: item.text,
//                           key: item.key,
//                           user: this.state.userName,
//                           asked: item.name
//                         });
//                       }}
//                     >
//                       <Icon name="paper" />
//                       <Text style={styles.badgeCount}>{item.totalans}</Text>
//                     </Button>
//                   </View>
//                   {/* <View style={styles.footerIcons}>
//                       <Button transparent dark>
//                         <Icon name="ios-repeat" />
//                         <Text style={styles.badgeCount}></Text>
//                       </Button>
//                     </View> */}
//                   <View style={styles.footerIcons}>
//                     <Button
//                       dark
//                       transparent
//                       onPress={() => {
//                         this.toggleLike(item.key);
//                       }}
//                     >
//                       <Icon active={item.like} name="thumbs-up" />
//                       <Text style={styles.badgeCount}>{item.likecount}</Text>
//                     </Button>
//                   </View>
//                   <View style={styles.footerIcons}>
//                     <Button
//                       transparent
//                       dark
//                       onPress={() => {
//                         var nav = this.props.navigation;
//                         const { navigate } = nav;
//                         navigate("Chat", {
//                           key: item.key,
//                           name: item.name
//                         });
//                       }}
//                     >
//                       <Icon name="ios-mail-outline" />
//                     </Button>
//                   </View>
//                 </View>
//               </View>
//             )}
//           />
//           {/* <View style={styles.footerIcons}>
//             <Button dark transparent onPress={this.toggleLike}>
//               <Icon active={this.state.toggle} name="thumbs-up" />
//               <Text style={styles.badgeCount}>
//                 {this.state.toggle ? "true" : "false"}
//               </Text>
//             </Button>
//           </View> */}
//         </View>
//       </View>
//     </View>
//   );
// }
