import { put, takeEvery, all, call } from "redux-saga/effects";
import { firebase } from "../firebaseconfig";

const atStartAnswer = function* atStartAnswer() {
  yield takeEvery("ANS_CONTENT", function*(action) {
    yield put({ type: "POST_STARTED" });
    try {
      var data = yield call(getAnswer.bind(this, action.payload));
      console.log(data);
      yield put({
        type: "FETCH_ANSWER",
        payload: data
      });
    } catch (error) {
      yield put({ type: "POST_FAILED" });
    }
  });
};

export default atStartAnswer;

const getAnswer = payload => {
  console.log(payload);
  var ques = [];
  var db = firebase.database().ref("/questions/" + payload.key + "/answer/");
  return new Promise((resolve, reject) => {
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(snap) {
          var key = snap.key;
          var text = snap.child("answer").val();
          var name = snap.child("user").val();
          var ob = { key, name, text };
          ques.push(ob);
          if (ques.length === snapshot.numChildren()) {
            resolve(ques);
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};
