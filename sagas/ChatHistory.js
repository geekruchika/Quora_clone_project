import { put, takeEvery, all, call } from "redux-saga/effects";
import { firebase } from "../firebaseconfig";

const chatgetData = function* chatgetData() {
  yield takeEvery("CHAT_CONTENT_GET", function*(action) {
    yield put({ type: "CHAT_STARTED" });
    try {
      var data = yield call(getChat.bind(this, action.payload));
      yield put({
        type: "FETCH_MESSAGE",
        payload: data
      });
    } catch (error) {
      yield put({ type: "POST_FAILED" });
    }
  });
};

export default chatgetData;

const getChat = payload => {
  let messages = [];
  var db = firebase
    .database()
    .ref("/messages/" + payload.receiverkey + payload.senderkey);
  return new Promise((resolve, reject) => {
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        var key = snapshot.key;
        var text = snapshot.child("message").val();
        messages = text;
        // console.log(messages);
        resolve(messages);
      })
      .catch(error => {
        reject(error);
      });
  });
};
