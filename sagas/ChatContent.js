import { put, takeEvery, all, call } from "redux-saga/effects";
import { firebase } from "../firebaseconfig";

const chatData = function* chatData() {
  yield takeEvery("CHAT_CONTENT", function*(action) {
    yield put({ type: "CHAT_STARTED" });
    try {
      yield call(chatContent.bind(this, action.payload));
      yield put({ type: "POST_SUCCESS" });

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

export default chatData;

const chatContent = payload => {
  var db = firebase
    .database()
    .ref("/messages/" + payload.receiverkey + payload.senderkey);

  db.set({
    message: payload.message
  });

  var db = firebase
    .database()
    .ref("/messages/" + payload.senderkey + payload.receiverkey);
  db.set({ message: payload.message });
};

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
        //console.log(messages);
        resolve(messages);
      })
      .catch(error => {
        reject(error);
      });
  });
};
