import React from "react";
import { Spinner } from "native-base";
import { AuthenticateUser } from "../firebasemethods";
class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let nav = this.props.navigation;
    AuthenticateUser(nav);
  }

  render() {
    return <Spinner />;
  }
}

export default SplashScreen;
