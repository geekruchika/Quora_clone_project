import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image
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

class UserAnswer extends React.Component {
  state = {
    userName: "",
    email: ""
  };
  render() {
    return (
      <View>
        <Text>UserAnswer page</Text>
      </View>
    );
  }
}

export default UserAnswer;
