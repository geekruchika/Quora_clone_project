import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
//import { WebBrowser } from "expo";
import {
  View,
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

export default class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

  state = { user: "", pass: "" };
  handleName = text => {
    this.setState({ user: text });
  };
  handlePassword = text => {
    this.setState({ pass: text });
  };
  login = () => {
    //event.preventDefault();
    var email = this.state.user;
    var password = this.state.pass;
    var nav = this.props.navigation;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function() {
        alert("You are logged in now...");
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("Email or password is badly formatted");
      });
  };

  call = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>QUORA</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          <Image
            source={require("../img/Quora-Logo.png")}
            style={{
              //position: "center",
              width: 100,
              height: 30,
              flex: 1,
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
              marginHorizontal: 130
            }}
          />
          <Item fixedLabel>
            <Label style={{ fontSize: 13 }}>
              A place to share knowledge and better understand the world
            </Label>
          </Item>
          <Text
            style={{ fontWeight: "bold", marginTop: 10, marginHorizontal: 10 }}
          >
            Login
          </Text>

          <Form style={{}}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={this.handleName} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                onChangeText={this.handlePassword}
                secureTextEntry={true}
              />
            </Item>
          </Form>
          {/* <View> */}
          <Right>
            <Button
              primary
              style={{ marginTop: 10, marginLeft: 240 }}
              onPress={this.login}
            >
              <Text style={{ fontWeight: "bold" }}>Login</Text>
            </Button>
          </Right>
          {/* </View> */}
          <Item fixedLabel style={{ display: "flex" }}>
            <Text style={{ fontSize: 13 }}>For new user....</Text>
            <Button transparent info onPress={this.call}>
              <Text style={{ fontSize: 15 }}>SignUp</Text>
            </Button>
          </Item>
        </Content>

        {/* <Footer>
          <FooterTab>
            <Button full>
              <Text>Welcome</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}
