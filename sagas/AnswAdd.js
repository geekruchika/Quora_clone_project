import { put, takeEvery, all, call } from "redux-saga/effects";
import { firebase } from "../firebaseconfig";

const watchAnswer = function* watchAnswer() {
  yield takeEvery("ANSWER_CONTENT", function*(action) {
    if (action.payload.answer) {
      yield put({ type: "POST_STARTED" });
      try {
        var data = yield call(answerContent.bind(this, action.payload));
        yield put({ type: "POST_SUCCESS" });
        // var data = yield call(getAnswerContent);
        // console.log(data);
        yield put({
          type: "FETCH_ANSWER",
          payload: data
        });
      } catch (error) {
        console.log(error);
        yield put({ type: "POST_FAILED" });
      }
    } else {
      yield put({ type: "POST_FAILED" });
    }
  });
};

export default watchAnswer;

const answerContent = payload => {
  var db = firebase.database().ref("/questions/" + payload.key + "/answer/");
  console.log(db);
  if (payload.answer != "")
    db.push({
      user: payload.user,
      answer: payload.answer,
      id: payload.id
    });
  var ques = [];
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
