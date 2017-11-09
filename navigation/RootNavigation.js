import { Notifications } from "expo";
import React from "react";
import { StackNavigator } from "react-navigation";
import signupScreen from "../screens/signupScreen";
import UserPage from "../screens/UserPage";
import MainTabNavigator from "./MainTabNavigator";
import SplashScreen from "../screens/splashScreen";
import answerScreen from "../screens/answerScreen";
import chatScreen from "../screens/chatScreen";
import Ans_Ques from "../screens/ans_quesScreen";
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
    },
    UserAns: {
      screen: Ans_Ques
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
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    // this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  // _registerForPushNotifications() {
  //   // Watch for incoming notifications
  //   this._notificationSubscription = Notifications.addListener(
  //     this._handleNotification
  //   );
  //}

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
