import React from "react";
import { Platform, StatusBar, StyleSheet, Text } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import RootNavigation from "./navigation/RootNavigation";
import { firebase } from "./firebaseconfig";
import { NavigationActions } from "react-navigation";
import allReducers from "./reducers/combineAllreducer";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
//import { apiMiddleware, reducer } from "./redux";
import store from "./store/store";

export default class App extends React.Component {
  state = { isLoadingComplete: false };

  componentWillMount() {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }).then(res => {
      this.setState({
        isLoadingComplete: true
      });
    });
  }

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <Provider store={store}>
          <RootNavigation />
        </Provider>
      );
    } else {
      return <Text>Loading...</Text>;
    }
    //   } else {
    //     return (
    //       <Provider store={store}>
    //         <RootNavigation />
    //       </Provider>
    //     );
    //   }
  }

  _loadResourcesAsync = async () => {
    console.log("fontt");
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync([
        // This is the font that we are using for our tab bar
        Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        {
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        }
      ])
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});
