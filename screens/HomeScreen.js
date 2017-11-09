import React from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
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
import { NavigationActions } from "react-navigation";
import { LoginUser } from "../firebasemethods";

export default class HomeScreen extends React.Component {
  state = {
    user: "",
    pass: ""
  };

  handleName = text => {
    this.setState({ user: text });
  };
  handlePassword = text => {
    this.setState({ pass: text });
  };
  login = () => {
    var email = this.state.user;
    var password = this.state.pass;
    LoginUser(email, password);
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

          <Right>
            <Button
              primary
              style={{ marginTop: 10, marginLeft: 240 }}
              onPress={this.login}
            >
              <Text style={{ fontWeight: "bold" }}>Login</Text>
            </Button>
          </Right>

          <Item fixedLabel style={{ display: "flex" }}>
            <Text style={{ fontSize: 13 }}>For new user....</Text>
            <Button transparent info onPress={this.call}>
              <Text style={{ fontSize: 15 }}>SignUp</Text>
            </Button>
          </Item>
        </Content>
      </Container>
    );
  }
}
