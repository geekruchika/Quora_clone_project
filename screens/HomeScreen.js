import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
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
    email = this.state.user;
    password = this.state.pass;
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
            style={{
              fontWeight: "bold",
              marginTop: 10,
              marginHorizontal: 10
            }}
          >
            Login
          </Text>

          <Form style={{}}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={this.handleName} />
            </Item>
            <Item floatingLabel last style={{}}>
              <Label>Password</Label>
              <Input
                onChangeText={this.handlePassword}
                secureTextEntry={true}
              />
            </Item>
          </Form>
          <View>
            <Left />
            <Body />
            <Right>
              <Button
                primary
                style={{ marginTop: 10, marginLeft: 240 }}
                onPress={this.login}
              >
                <Text style={{ fontWeight: "bold" }}> Login </Text>
              </Button>
            </Right>
          </View>
          <Item fixedLabel>
            <Label style={{ fontSize: 13 }}>
              For new user....<Button
                transparent
                info
                style={{ width: 10, height: 10 }}
                onPress={this.call}
              >
                <Text>SignUp</Text>
              </Button>
            </Label>
          </Item>
        </Content>

        <Footer>
          <FooterTab>
            <Button full>
              <Text>Welcome</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
