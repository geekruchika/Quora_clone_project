import React from "react";
import { ScrollView, ListView } from "react-native";
import {
  Button,
  View,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Input,
  Form,
  Item,
  List,
  ListItem,
  Thumbnail
} from "native-base";
import { NavigationActions } from "react-navigation";
import { CurrentUser, AddUserToDatabase } from "../firebasemethods";
import { fetchrecord, postrecord } from "../actions";
//import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = this.ds.cloneWithRows(this.props.record["record"]);
  }
  state = {
    newContent: "",
    userName: "",
    id: "",
    email: "",
    question: [],
    value: ""
  };

  componentWillMount() {
    console.ignoredYellowBox = ["Setting a timer"];
    var user = CurrentUser();
    if (user) {
      this.state.userName = user.displayName;
      this.state.email = user.email;
      this.state.id = user.uid;
      AddUserToDatabase(user.uid, user.displayName, user.email);
    }

    this.props.dispatch(fetchrecord());
  }

  postContent() {
    this.setState({ value: "" });
    this.props.dispatch(
      postrecord({
        uid: this.state.id,
        user: this.state.userName,
        Content: this.state.newContent
      })
    );
  }

  arrayrender() {
    let nav = this.props.navigation;
    var ques = this.props.record["record"];
    var name = this.state.userName;
    //ques.reverse();
    return ques.map(function(el, i) {
      return (
        <ListItem
          key={i}
          avatar
          onPress={() => {
            console.log(el.text);
            const { navigate } = nav;
            navigate("Answer", {
              data: el.text,
              key: el.key,
              user: name,
              asked: el.name
            });
          }}
        >
          <Left>
            <Thumbnail source={require("../img/Q.jpg")} />
          </Left>
          <Body>
            <Text>{el.name}</Text>
            <Text note>{el.text}</Text>
          </Body>
          <Right>
            <Icon
              name="paper"
              onPress={() => {
                console.log(el.text);
                const { navigate } = nav;
                navigate("Answer", {
                  data: el.text,
                  key: el.key,
                  user: name,
                  asked: el.name
                });
              }}
            />
            <Text note>1:20 pm</Text>
          </Right>
        </ListItem>
      );
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <List>
            <ListItem avatar style={{ marginTop: 10 }}>
              <Left>
                <Thumbnail source={require("../img/img_lights.jpg")} />
              </Left>
              <Body>
                <Text>{this.state.userName}</Text>
              </Body>
              <Right />
            </ListItem>
          </List>
        </View>
        <View style={{ flex: 2, marginTop: 20 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Form style={{ flex: 8, margin: 10 }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Input
                  style={{
                    flex: 1,
                    fontSize: 20,
                    alignContent: "flex-start",
                    justifyContent: "flex-start",
                    textAlignVertical: "top",
                    margin: 5
                  }}
                  value={this.state.value}
                  multiline
                  placeholder="What is your question?"
                  onChangeText={text =>
                    this.setState({
                      newContent: text,
                      value: text
                    })
                  }
                />
              </Item>
            </Form>
            <Button
              transparent
              danger
              style={{ flex: 2, height: 30, marginTop: 40 }}
              onPress={() => this.postContent()}
            >
              <Text>ASK</Text>
            </Button>
          </View>
        </View>
        <View style={{ flex: 8, borderStyle: "solid" }}>
          <ScrollView>
            <List>{this.arrayrender()}</List>
            {/* <ListView
            dataSource={this.dataSource}
            renderRow={rowdata => (
              <View
                avatar
                onPress={() => {
                  console.log(rowdata.text);
                  let nav = this.props.navigation;
                  const { navigate } = nav;
                  navigate("Answer", {
                    data: rowdata.text,
                    key: rowdata.key,
                    user: name,
                    asked: rowdata.name
                  });
                }}
              >
                <Left>
                  <Thumbnail source={require("../img/Q.jpg")} />
                </Left>
                <Body>
                  <Text>{rowdata.name}</Text>
                  <Text note>{rowdata.text}</Text>
                </Body>
                <Right>
                  <Icon
                    name="paper"
                    onPress={() => {
                      //console.log(el.text);
                      let nav = this.props.navigation;
                      const { navigate } = nav;
                      navigate("Answer", {
                        data: rowdata.text,
                        key: rowdata.key,
                        user: name,
                        asked: rowdata.name
                      });
                    }}
                  />
                  <Text note>1:20 pm</Text>
                </Right>
              </View>
            )}
            enableEmptySections={true}
          /> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    record: state.record
  };
}

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchrecord: fetchrecord }, dispatch);
// }, matchDispatchToProps
export default connect(mapStateToProps)(UserHome);
