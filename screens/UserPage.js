import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
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
  Label,
  Tab,
  Tabs,
  TabHeading
} from "native-base";
import { MonoText } from "../components/StyledText";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";
import UserProfile from "../components/userprofile";
import UserHome from "../components/userhome";
import UserChat from "../components/userchat";
import UserAnswer from "../components/useranswer";

class UserPage extends React.Component {
  // state = {
  //   selectedTab: "UserHome"
  // };

  constructor(props) {
    super(props);
    //this.color = "black";
  }

  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "UserHome":
        return <UserHome {...this.props} />;
        break;
      case "UserProfile":
        return <UserProfile {...this.props} />;
        break;
      case "UserChat":
        return <UserChat />;
        break;
      case "UserAnswer":
        return <UserAnswer />;
        break;
      default:
    }
  }

  render() {
    //console.log(this.state.selectedTab);
    //style={{ backgroundColor: "#C70505" }}
    return (
      <Container>
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          <ScrollView>
            {/* <Header hasTabs /> */}
            <Tabs initialPage={0}>
              <Tab
                heading={
                  <TabHeading>
                    {/* <TouchableOpacity
                  active={this.state.selectedTab === "UserHome"}
                  onPress={() => {
                    this.changecolor();
                    this.setState({ selectedTab: "UserHome" });
                  }}
                > */}
                    <Icon name="home" style={{ fontSize: 22 }} />
                    <Text>Home</Text>
                    {/* </TouchableOpacity> */}
                  </TabHeading>
                }
              >
                <UserHome {...this.props} />
              </Tab>

              <Tab
                heading={
                  <TabHeading>
                    {/* <TouchableOpacity
                    transparent
                    primary
                    active={this.state.selectedTab === "UserAnswer"}
                    onPress={() =>
                      this.setState({
                        selectedTab: "UserAnswer"
                      })}
                  > */}
                    <Icon name="paper" />
                    <Text>Answer</Text>
                    {/* </TouchableOpacity> */}
                  </TabHeading>
                }
              >
                <UserAnswer />
              </Tab>

              <Tab
                heading={
                  <TabHeading>
                    {/* <TouchableOpacity
                  active={this.state.selectedTab === "UserAsk"}
                  onPress={() =>
                    this.setState({
                      selectedTab: "UserAsk"
                    })}
                > */}
                    <Icon active name="chatbubbles" />
                    <Text>Chat</Text>
                    {/* </TouchableOpacity> */}
                  </TabHeading>
                }
              >
                <UserChat {...this.props} />
              </Tab>

              <Tab
                heading={
                  <TabHeading>
                    {/* <TouchableOpacity
                  active={this.state.selectedTab === "UserProfile"}
                  onPress={() =>
                    this.setState({
                      selectedTab: "UserProfile"
                    })}
                > */}
                    <Icon name="person" style={{ alignItems: "center" }} />
                    <Text>Profile</Text>
                    {/* </TouchableOpacity> */}
                  </TabHeading>
                }
              >
                <UserProfile {...this.props} />
              </Tab>
            </Tabs>
            {/* <Content>{this.renderSelectedTab()}</Content> */}
          </ScrollView>
        </Content>

        <Footer>
          <Image
            style={{
              //position: "center",
              width: 100,
              height: 30,
              flex: 1,
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
              marginHorizontal: 130
            }
            // marginLeft: 125 //position: "relative",
            }
            source={require("../img/Quora-Logo.png")}
          />
        </Footer>
      </Container>
    );
  }
}
// const styles = StyleSheet.create(
// getStartedText: {
//   fontSize: 17,
//   color: "rgba(96,100,109, 1)",
//   lineHeight: 24,
//   textAlign: "center"
// }
//);

export default UserPage;
