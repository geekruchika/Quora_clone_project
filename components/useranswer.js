import React from "react";
import { ScrollView, StyleSheet, ListView } from "react-native";
import {
  Left,
  Right,
  Body,
  View,
  Icon,
  Text,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Header,
  Title
} from "native-base";

import { CurrentUser, deleteUserQuesDatabase } from "../firebasemethods";
import { connect } from "react-redux";
import { fetchrecord } from "../actions";
import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";

class UserAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.ob = "";
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    //this.dataSource = ds.cloneWithRows(this.props.ques_ans.ques_ans);
  }

  state = {
    userName: "",
    email: "",
    uid: "",
    answer: [],
    ques_ans: [],
    record: []
  };

  componentWillMount() {
    var name, email, uid;
    var user = CurrentUser();
    if (user != null) {
      this.state.userName = user.displayName;
      this.state.email = user.email;
      this.state.uid = user.uid;
    }

    this.props.dispatch(
      fetchrecord({
        payload: this.state.uid
      })
    );
  }

  deleteQuestion(ob) {
    deleteUserQuesDatabase(ob);
    this.props.dispatch(fetchrecord());
  }

  arrayrender() {
    var ques = this.props.record["record"];

    var uid = this.state.uid;
    let thisref = this;
    return ques.map(function(el, i) {
      if (uid == el.id) {
        return (
          <View key={i}>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require("../img/Q.jpg")} />
              </Left>
              <Body>
                <Text>{el.name}</Text>
                <Text note>{el.text}</Text>
              </Body>
              <Right>
                <Icon
                  name="pint"
                  onPress={() => {
                    //thisref.deleteQuestion(el)
                    thisref.ob = el;
                    thisref.popupDialog.show();
                  }}
                />
              </Right>
            </ListItem>
          </View>
        );
      }
    });
  }

  render() {
    const slideAnimation = new SlideAnimation({ slideFrom: "bottom" });
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Card style={{ flex: 1, flexDirection: "row" }}>
            <CardItem style={{ flex: 9 }}>
              <Left>
                <Text>{this.state.userName}</Text>
              </Left>
            </CardItem>
            <Icon style={{ flex: 1 }} name="refresh" onPress={() => {}} />
          </Card>
        </View>

        <View style={{ flex: 8 }}>
          <ScrollView>
            <List>{this.arrayrender()}</List>
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            block
            danger
            style={{}}
            onPress={() => {
              const { navigate } = this.props.navigation;
              // console.log(this.props.navigation);
              navigate("UserAns");
            }}
          >
            <Text>Answer done by you</Text>
          </Button>
        </View>
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View
            style={
              { display: "flex", alignItems: "center" }
              //justifyContent: " center"
            }
          >
            <View style={{}}>
              <Text>Sure you want to delete?</Text>
            </View>
            <View>
              <Button
                transparent
                danger
                onPress={() => {
                  this.deleteQuestion(this.ob);
                  this.popupDialog.dismiss();
                  //thisref.popupDialog.show();
                }}
              >
                <Text>Yes</Text>
              </Button>
            </View>
            <View>
              <Button
                transparent
                danger
                onPress={() => {
                  this.popupDialog.dismiss();
                }}
              >
                <Text>No</Text>
              </Button>
            </View>
          </View>
        </PopupDialog>

        {/* <View style={{ flex: 1 }}>
          <Card style={{ borderColor: "red" }}>
            <CardItem header>
              <Text>Answer done by you</Text>
            </CardItem>
          </Card>
        </View>

        <View style={{ flex: 4 }}>
          <ScrollView>
            <List>{this.arrayforanswer()}</List>
          </ScrollView>
        </View> */}
        {/* <ListView
            //style={styles.container}
            dataSource={this.ds.cloneWithRows(this.props.ques_ans.ques_ans)}
            renderRow={data => (
              <View>
                {this.arrayforanswer(data)}
              </View>
            )}
            enableEmptySections={true}
          /> */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    record: state.record,
    ques_ans: state.ques_ans,
    answer: state.record.answer
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});
export default connect(mapStateToProps, null)(UserAnswer);
