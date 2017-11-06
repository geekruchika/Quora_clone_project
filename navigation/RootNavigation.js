import { Notifications } from "expo";
import React from "react";
import { StackNavigator } from "react-navigation";
import signupScreen from "../screens/signupScreen";
import UserPage from "../screens/UserPage";
import MainTabNavigator from "./MainTabNavigator";
import SplashScreen from "../screens/splashScreen";
import answerScreen from "../screens/answerScreen";
import chatScreen from "../screens/chatScreen";
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";

const RootStackNavigator = StackNavigator(
  {
    Splash: {
      screen: SplashScreen
    },
    Main: {
      screen: MainTabNavigator
    },
    Profile: {
      screen: signupScreen
    },
    User: {
      screen: UserPage
    },
    Answer: {
      screen: answerScreen
    },
    Chat: {
      screen: chatScreen
    }
  },
  { headerMode: "none" },
  { initialRouteName: "Splash" },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal"
      }
    })
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
