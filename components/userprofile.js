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
import { CurrentUser, LogOut } from "../firebasemethods";

//import { ImagePicker } from "expo";
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
    var user = CurrentUser();
    if (user) {
      this.state.userName = user.displayName;
      this.state.userid = user.uid;
    }
  }
  signout = () => {
    let nav = this.props.navigation;
    LogOut(nav);
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

export default UserProfile;

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
