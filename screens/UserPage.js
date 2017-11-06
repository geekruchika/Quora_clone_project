import React, { Component } from "react";
import { Image, ScrollView, StyleProvider } from "react-native";
import tabTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
  Container,
  Content,
  Footer,
  Icon,
  Text,
  Tab,
  Tabs,
  TabHeading,
  View,
  Header
} from "native-base";
//import { MonoText } from "../components/StyledText";
import { NavigationActions } from "react-navigation";
import { firebase } from "../firebaseconfig";
import UserProfile from "../components/userprofile";
import UserHome from "../components/userhome";
import UserChat from "../components/userchat";
import UserAnswer from "../components/useranswer";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // renderSelectedTab() {
  //   switch (this.state.selectedTab) {
  //     case "UserHome":
  //       return <UserHome {...this.props} />;
  //       break;
  //     case "UserProfile":
  //       return <UserProfile {...this.props} />;
  //       break;
  //     case "UserChat":
  //       return <UserChat />;
  //       break;
  //     case "UserAnswer":
  //       return <UserAnswer />;
  //       break;
  //     default:
  //   }
  // }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        {/* <Content > */}
        <Header hasTabs />
        {/* <StyleProvider style={tabTheme(material)}> */}
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
                <Icon name="paper" />
                <Text>Answer</Text>
              </TabHeading>
            }
          >
            <UserAnswer />
          </Tab>

          <Tab
            heading={
              <TabHeading>
                <Icon active name="chatbubbles" />
                <Text>Chat</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              <UserChat {...this.props} />
            </ScrollView>
          </Tab>

          <Tab
            heading={
              <TabHeading>
                <Icon name="person" style={{ alignItems: "center" }} />
                <Text>Profile</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              <UserProfile {...this.props} />
            </ScrollView>
          </Tab>
        </Tabs>

        <Footer>
          <Image
            style={{
              width: 100,
              height: 30,
              flex: 1,
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
              marginHorizontal: 130
            }}
            source={require("../img/Quora-Logo.png")}
          />
        </Footer>
      </Container>
    );
  }
}

export default UserPage;
