import { put, takeEvery, all, call } from "redux-saga/effects";
import { firebase } from "../firebaseconfig";

const quesAns = function* quesAns() {
  yield takeEvery("QUES_ANS_CONTENT", function*(action) {
    yield put({ type: "QUES_STARTED" });
    try {
      var data = yield call(getQuesAns.bind(this, action.payload));
      console.log(data);
      yield put({
        type: "FETCH_QUES_ANS",
        payload: data
      });
    } catch (error) {
      console.log(error);
      yield put({ type: "POST_FAILED" });
    }
  });
};

export default quesAns;

const getQuesAns = payload => {
  console.log("saga" + payload.uid);
  var db = firebase.database().ref("/questions/");
  var ob = [];
  var uid = payload.uid;
  var ques_ans = [];

  return new Promise((resolve, reject) => {
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(snap) {
          var keyques = snap.key;
          var ans = snap.child("answer");
          var ques = snap.child("text").val();
          var ob = [];
          ans.forEach(function(text) {
            var key = text.key;
            var id = text.child("id").val();
            var val = text.child("answer").val();
            if (uid === id) {
              ob.push({ val, key, keyques });
            }
          });

          if (ob.length > 0) {
            var data = { ques, ob };
            ques_ans.push(data);
          }
        });
        resolve(ques_ans);
      });
  });
};
