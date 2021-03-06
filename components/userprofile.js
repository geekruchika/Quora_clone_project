import React from "react";
import { Image } from "react-native";
import {
  View,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import { CurrentUser, LogOut, getAllUsers } from "../firebasemethods";

import { ImagePicker } from "expo";
import b64 from "base64-js";
import { firebase } from "../firebaseconfig";
// import {decode} from 'base64-arraybuffer';
//import RNFetchBlob from "react-native-fetch-blob";
import { imageUpload, userRecord } from "../actions";
import { connect } from "react-redux";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    userid: "",
    userName: "",
    email: "",
    uri: "",
    record: [],
    user: []
  };
  componentWillMount() {
    var user = CurrentUser();
    if (user) {
      this.state.userName = user.displayName;
      this.state.userid = user.uid;
      this.state.email = user.email;
      this.state.uri = user.photoURL;
    }
  }
  signout = () => {
    let nav = this.props.navigation;
    LogOut(nav);
  };

  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });
    if (result.cancelled == true) {
      return;
    }
    const byteArray = b64.toByteArray(result.base64);
    const metadata = { contentType: "image/jpg" };
    // const sessionId = new Date().getTime();
    var firestore = firebase.storage().ref("images" + this.state.userid);
    var chatUsr = firebase.database().ref("/users/" + this.state.userid);
    firestore
      .child("profile")
      // .child(`${sessionId}`)
      .put(byteArray, metadata)
      .then(() => {
        firestore
          .child("profile")
          .getDownloadURL()
          .then(snapshot => {
            var user = firebase.auth().currentUser;

            user
              .updateProfile({ photoURL: snapshot })
              .then(function() {
                console.log("success image");
              })
              .catch(function(error) {
                // An error happened.
                console.log("fail image");
              });
            chatUsr.update({
              image: snapshot
            });
            this.props.dispatch(
              imageUpload({
                photo: snapshot,
                id: this.state.userid
              })
            );
            this.props.dispatch(
              userRecord({
                name: this.state.userName,
                email: this.state.email,
                id: this.state.id,
                image: result.uri
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
        console.log("uploaded image!");
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {}

  render() {
    console.log(this.props.user.user.image);
    return (
      <View>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: this.props.user.user.image }} />
              <Body>
                <Text>{this.props.user.user.userName}</Text>
                <Text note>{this.props.user.user.email}</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent primary onPress={this._pickImage}>
                <Text>Edit Pic</Text>
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Image
                source={{ uri: this.props.user.user.image }}
                style={{ height: 200, width: 340, flex: 1 }}
              />
            </Body>
          </CardItem>
          <CardItem>
            <Text>
              I do not exist to impress the world. I exist to live my life in a
              way that will make me happy.
            </Text>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Right>
              <Button
                transparent
                textStyle={{ color: "#87838B" }}
                onPress={this.signout}
              >
                <Text>Log Out</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>

        <View>
          <Card>
            <CardItem header>
              <Text>You may connect to other account!</Text>
            </CardItem>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name="logo-facebook" />
              <Text>Facebook</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name="logo-twitter" />
              <Text>Twitter</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name="logo-reddit" />
              <Text>Reddit</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name="logo-linkedin" />
              <Text>Linked In</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name="logo-youtube" />
              <Text>You Tube</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
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
export default connect(mapStateToProps)(UserProfile);

//var storage = firebase.app().storage("gs://my-custom-bucket");
// var storage = firebase.storage();
// var sref = storage.ref();
// // var imagesRef = sref.child("custom-storage");
// // console.log(imagesRef);
// sref.putString(base64, "base64");

// _pickImage = async () => {
//   let pickerResult = await ImagePicker.launchImageLibraryAsync({
//     base64: true
//   });

//   this._handleImagePicked(pickerResult);
// };

// _handleImagePicked = async pickerResult => {
//   let uploadResponse, uploadResult;
//   //console.log(pickerResult.base64);
//   this.setState({
//     uri: pickerResult.uri
//   });
// var base64 = pickerResult.base64;
// var storage = firebase.storage();
// var sref = storage.ref();
// var imagesRef = sref.child("custom-storage/test.jpg");
// //var message = "custom-storage";
// imagesRef.putString(base64, "base64").then(function(snapshot) {
//   console.log("Uploaded a base64 string!");
// });
//sref.putString(base64, "base64");

// let uriParts = pickerResult.uri.split(".");
// let fileType = pickerResult.uri[pickerResult.uri.length - 1];

// let formData = new FormData();
// formData.append("photo", {
//   pickerResult,
//   name: `photo.${fileType}`,
//   type: `image/${fileType}`
// });

// new Promise((RESOLVE, REJECT) => {
//   // Fetch attachment
//   RNFetchBlob.fetch("GET", pickerResult.uri).then(response => {
//     let base64Str = response.data;
//     //  var imageBase64 =
//     //    "data:" + mimetype_attachment + ";base64," + base64Str;
//     // Return base64 image
//     console.log(base64Str);
//     // RESOLVE(imageBase64);
//   });
// }).catch(error => {
//   // error handling
//   console.log("Error: ", error);
// });
//};
