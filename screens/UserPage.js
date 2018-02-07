import React, { Component } from "react";
import { Image, ScrollView, StyleProvider } from "react-native";
//import tabTheme from "../native-base-theme/components";
//import material from "../native-base-theme/variables/material";
import {
  Container,
  Footer,
  Icon,
  Text,
  Tab,
  Tabs,
  TabHeading,
  Header,
  Title
} from "native-base";

import UserProfile from "../components/userprofile";
import UserHome from "../components/userhome";
import UserChat from "../components/userchat";
import UserAnswer from "../components/useranswer";
import { CurrentUser } from "../firebasemethods";
class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <Header hasTabs style={{ backgroundColor: "#d9534f", height: 40 }}>
          <Title
            style={
              { color: "white", alignSelf: "center", fontSize: 20 }
              // fontWeight: 400
            }
          >
            {CurrentUser().displayName}
          </Title>
        </Header>
        <Tabs
          initialPage={0}
          tabBarUnderlineStyle={{ backgroundColor: "white" }}
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#d9534f" }}>
                <Icon name="home" style={{ fontSize: 22 }} />
                <Text style={{ color: "white" }}>Home</Text>
              </TabHeading>
            }
          >
            <UserHome {...this.props} />
          </Tab>

          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#d9534f" }}>
                <Icon name="paper" />
                <Text style={{ color: "white" }}>Answer</Text>
              </TabHeading>
            }
          >
            <UserAnswer {...this.props} />
          </Tab>

          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#d9534f" }}>
                <Icon active name="chatbubbles" />
                <Text style={{ color: "white" }}>Chat</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              <UserChat {...this.props} />
            </ScrollView>
          </Tab>

          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#d9534f" }}>
                <Icon name="person" style={{ alignItems: "center" }} />
                <Text style={{ color: "white" }}>Profile</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              <UserProfile {...this.props} />
            </ScrollView>
          </Tab>
        </Tabs>

        <Footer style={{ backgroundColor: "#d9534f" }}>
          <Text
            style={{
              fontSize: 30,
              color: "white",
              alignSelf: "center",
              fontWeight: "bold",
              fontStyle: "italic"
            }}
          >
            Que‘
          </Text>
          {/* <Image
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
          /> */}
        </Footer>
      </Container>
    );
  }
}

export default UserPage;
