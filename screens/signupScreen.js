import React, { Component } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import {
  Container,
  Header,
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
  Label
} from "native-base";
import { MonoText } from "../components/StyledText";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";

class signupScreen extends React.Component {
  state = {
    fname: "",
    lname: "",
    user: "",
    pass: ""
  };
  handleFName = text => {
    this.setState({ fname: text });
  };
  handleLName = text => {
    this.setState({ lname: text });
  };
  handleUName = text => {
    this.setState({ user: text });
  };
  handlePassword = text => {
    this.setState({ pass: text });
  };
  //   setUserId = () => {
  //     this.setState({ userId: Math.random() });
  //   };
  addUser = () => {
    console.log("adduser");
    var id = Math.random();
    let firstname = this.state.fname;
    let lastname = this.state.lname;
    let username = this.state.user;
    let password = this.state.pass;
    //console.log(firstname, lastname, username, password, id);
    var nav = this.props.navigation;
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(function() {
        var user = firebase.auth().currentUser;

        user
          .updateProfile({ displayName: firstname + " " + lastname })
          .then(function() {
            // Update successful.
            alert("Account Created");
            alert("Now you can sign with your Email and Password");
            console.log("added");
            const { navigate } = nav;
            navigate("User");
          })
          .catch(function(error) {
            // An error happened.
            console.log(error);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("already have an account");
        // ...
      });
  };

  call = () => {
    const { navigate } = this.props.navigation;
    navigate("Main");
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Create Account</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{ backgroundColor: "#FFFFFF" }}>
          <Label style={{ margin: 10 }}>Firstname:</Label>
          <Form>
            <Item>
              <Input
                placeholder=""
                style={{ height: 30, margin: 10 }}
                onChangeText={this.handleFName}
              />
            </Item>
            <Label style={{ margin: 10 }}>Lastname:</Label>
            <Item>
              <Input
                placeholder=""
                style={{ height: 30, margin: 10 }}
                onChangeText={this.handleLName}
              />
            </Item>
            <Label style={{ margin: 10 }}>EmailId:</Label>
            <Item>
              <Input
                placeholder="" //uppercase={false}
                style={{ height: 30, margin: 10 }}
                onChangeText={this.handleUName}
              />
            </Item>
            <Label style={{ margin: 10 }}>Password:</Label>
            <Item>
              <Input
                placeholder=""
                style={{ height: 30, margin: 10 }}
                onChangeText={this.handlePassword}
                secureTextEntry={true}
              />
            </Item>
          </Form>
          <Button block danger style={{ margin: 10 }} onPress={this.addUser}>
            <Text>Join Now</Text>
          </Button>
          <Item fixedLabel>
            <Label style={{ fontSize: 13 }}>
              Already on Quora?....<Button
                transparent
                info
                style={{ width: 10, height: 10 }}
                onPress={this.call}
              >
                <Text>Sign in</Text>
              </Button>
            </Label>
          </Item>
        </Content>
        <Footer />
      </Container>
    );
    //   <View>
    //     <Text>page...</Text>
    //     <TouchableOpacity onPress={this.nav}>
    //       <Text>Back</Text>
    //     </TouchableOpacity>
    //   </View>
  }
}
export default signupScreen;
