// import React from "react";
// import {} from "react-native";
// import {
//   Left,
//   Right,
//   Body,
//   View,
//   Icon,
//   Text,
//   List,
//   ListItem,
//   Thumbnail,
//   Card,
//   CardItem
// } from "native-base";
// import { CurrentUser, getAllUsers } from "../firebasemethods";

// class UserChat extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//     Alluser: [],
//     userid: ""
//   };

//   componentWillMount() {
//     var thisref = this;
//     var Allusers = [];
//     var user = CurrentUser();
//     if (user) {
//       this.state.userid = user.uid;
//     }

//     var db = getAllUsers();
//     db
//       .orderByKey()
//       .once("value")
//       .then(function(snapshot) {
//         snapshot.forEach(function(snap) {
//           var key = snap.key;
//           var name = snap.child("user").val();
//           var image = snap.child("image").val();
//           var ob = { key, name, image };
//           Allusers.push(ob);
//           if (Allusers.length === snapshot.numChildren()) {
//             thisref.setState({
//               Alluser: Allusers
//             });
//           }
//         });
//       })
//       .catch(error => {});
//   }

// arrayrender() {
//   let nav = this.props.navigation;
//   let thisref = this;

//   return this.state.Alluser.map(function(el, i) {
//     if (thisref.state.userid != el.key) {
//       return (
//         <ListItem
//           key={i}
//           avatar
//           onPress={() => {
//             const { navigate } = nav;
//             navigate("Chat", { key: el.key, name: el.name, image: el.image });
//           }}
//         >
//           <Left>
//             <Thumbnail source={{ uri: el.image }} />
//           </Left>
//           <Body>
//             <Text>{el.name}</Text>
//           </Body>
//           {/* <Right> */}

//           <Icon
//             style={{
//               marginRight: 10,
//               fontSize: 20
//             }}
//             name="ios-text-outline"
//             onPress={() => {
//               const { navigate } = nav;
//               navigate("Chat", { key: el.key, name: el.name });
//             }}
//           />
//           {/* </Right> */}
//         </ListItem>
//       );
//     }
//   });
// }

//   render() {
//     return (
//       <View>
//         <Card>
//           <CardItem header>
//             <Text>Chat List</Text>
//           </CardItem>
//         </Card>
//         <List>{this.arrayrender()}</List>
//       </View>
//     );
//   }
// }

// export default UserChat;

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
  Left,
  Right,
  Body,
  // View,
  Icon,
  //Text,
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem
} from "native-base";
import SearchInput, { createFilter } from "react-native-search-filter";
import { CurrentUser, getAllUsers } from "../firebasemethods";
const KEYS_TO_FILTERS = ["name"];
const { height, width } = Dimensions.get("window");
export default class UserChat extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { Alluser: [], userid: "" };

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

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  // arrayrender() {
  //   let nav = this.props.navigation;
  //   let thisref = this;

  //   return this.state.Alluser.map(function(el, i) {
  //     if (thisref.state.userid != el.key) {
  //       return (
  //         <ListItem
  //           key={i}
  //           avatar
  //           onPress={() => {
  //             const { navigate } = nav;
  //             navigate("Chat", {
  //               key: el.key,
  //               name: el.name,
  //               image: el.image
  //             });
  //           }}
  //         >
  //           <Left>
  //             <Thumbnail source={{ uri: el.image }} />
  //           </Left>
  //           <Body>
  //             <Text>{el.name}</Text>
  //           </Body>
  //           {/* <Right> */}

  //           <Icon
  //             style={{
  //               marginRight: 10,
  //               fontSize: 20
  //             }}
  //             name="ios-text-outline"
  //             onPress={() => {
  //               const { navigate } = nav;
  //               navigate("Chat", {
  //                 key: el.key,
  //                 name: el.name
  //               });
  //             }}
  //           />
  //           {/* </Right> */}
  //         </ListItem>
  //       );
  //     }
  //   });
  // }

  render() {
    var filteredEmails = this.state.Alluser;
    if (this.state.searchTerm) {
      filteredEmails = this.state.Alluser.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
    }
    // const filteredEmails = this.state.Alluser.filter(
    //   createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    // );

    return (
      <View style={styles.container}>
        <Card style={{ alignItems: "center" }}>
          <CardItem>
            <SearchInput
              onChangeText={term => {
                this.searchUpdated(term);
              }}
              style={styles.searchInput}
              placeholder="Type a username to search"
            />
          </CardItem>
        </Card>
        <View>
          <List>
            {filteredEmails.map(el => {
              if (this.state.userid != el.key) {
                return (
                  <ListItem
                    style={{ margin: 5 }}
                    avatar
                    key={el.key}
                    onPress={() => {
                      const { navigate } = this.props.navigation;
                      navigate("Chat", {
                        key: el.key,
                        name: el.name,
                        image: el.image
                      });
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
                      style={{ marginRight: 15, fontSize: 20 }}
                      name="ios-text-outline"
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("Chat", { key: el.key, name: el.name });
                      }}
                    />
                    {/* </Right> */}
                  </ListItem>
                );
              }
            })}
          </List>
        </View>
        {/* <List>{this.arrayrender()}</List> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },

  searchInput: {
    padding: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    width: width - 8
  }
});
