import React, { Component } from "react";
import { TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import {
  Container,
  Header,
  View,
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
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import { MonoText } from "../components/StyledText";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";
import { ImagePicker } from "expo";
// import {decode} from 'base64-arraybuffer';

//import RNFetchBlob from "react-native-fetch-blob";
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    userName: "",
    email: "",
    uri: "/Users/ruchika/Sites/projects/quora-project/img/img_lights.jpg"
  };
  componentWillMount() {
    const thisRef = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        //console.log(email, emailVerified, photoURL, providerData);
        thisRef.setState({
          userName: displayName,
          email: email
        });
      } else {
        // User is signed out.
        // ...
      }
    });

    //var storage = firebase.app().storage("gs://my-custom-bucket");
    // var storage = firebase.storage();
    // var sref = storage.ref();
    // // var imagesRef = sref.child("custom-storage");
    // // console.log(imagesRef);
    // sref.putString(base64, "base64");
  }
  signout = () => {
    let nav = this.props.navigation;
    // console.log(nav);
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          console.log("Signed Out");

          const { navigate } = nav;
          nav.goBack("Main");
          //nav.goBack("Main");
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      );
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    //console.log(pickerResult.base64);
    this.setState({
      uri: pickerResult.uri
    });
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
  };

  render() {
    return (
      <View>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={require("../img/img_lights.jpg")} />
              <Body>
                <Text>{this.state.userName}</Text>
                <Text note>{this.state.email}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image
                source={require("../img/img_lights.jpg")}
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
        {/* <View>
          <Button onPress={this._pickImage}>
            <Text>check</Text>
          </Button>

          <Image
            style={{ height: 200, width: 200 }}
            source={{
              uri: this.state.uri
            }}
          />
        </View> */}
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

// async function uploadImageAsync(uri) {
//   let apiUrl = "https://file-upload-example-backend-dkhqoilqqn.now.sh/upload";

//   // Note:
//   // Uncomment this if you want to experiment with local server
//   //
//   // if (Constants.isDevice) {
//   //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//   // } else {
//   //   apiUrl = `http://localhost:3000/upload`
//   // }
//   console.log();
//   let uriParts = uri.split(".");
//   let fileType = uri[uri.length - 1];

//   let formData = new FormData();
//   formData.append("photo", {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`
//   });

//   let options = {
//     method: "POST",
//     body: formData,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data"
//     }
//   };

//   return fetch(apiUrl, options);
// }

export default UserProfile;
