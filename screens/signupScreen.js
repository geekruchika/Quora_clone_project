import React, { Component } from "react";
import {} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  Button,
  Text,
  Input,
  Form,
  Item,
  Label
} from "native-base";
import { NavigationActions } from "react-navigation";
import { CreateUser } from "../firebasemethods";

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

  addUser = () => {
    let firstname = this.state.fname;
    let lastname = this.state.lname;
    let username = this.state.user;
    let password = this.state.pass;

    if (firstname == "" || lastname == "" || username == "" || password == "") {
      alert("Please fillup the form.");
      return;
    }

    var nav = this.props.navigation;
    CreateUser(username, password, firstname, lastname, nav);
  };

  call = () => {
    const { navigate } = this.props.navigation;
    navigate("Main");
  };

  render() {
    return (
      <Container>
        <Header>
          <Title>Create Account</Title>
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
                placeholder=""
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
            <Text style={{ fontSize: 13 }}>Already on Quora?....</Text>
            <Button transparent info onPress={this.call}>
              <Text>Sign in</Text>
            </Button>
          </Item>
        </Content>
        <Footer />
      </Container>
    );
  }
}
export default signupScreen;
