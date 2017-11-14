import { put, takeEvery, all, call } from "redux-saga/effects";
import { firebase } from "../firebaseconfig";

const atStart = function* atStart() {
  yield takeEvery("START_CONTENT", function*() {
    yield put({ type: "POST_STARTED" });
    try {
      var data = yield call(getContent);
      // console.log(data);
      yield put({
        type: "FETCH_CONTENT",
        payload: data
      });
    } catch (error) {
      console.log(error);
      yield put({ type: "POST_FAILED" });
    }
  });
};

export default atStart;

const getContent = () => {
  var ques = [];
  var db = firebase.database().ref("/questions/");

  return new Promise((resolve, reject) => {
    db
      .orderByKey()
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(snap) {
          var key = snap.key;
          var totalans = snap.child("answer").numChildren();
          var text = snap.child("text").val();
          var name = snap.child("user").val();
          var id = snap.child("id").val();
          var like = snap.child("likes_id").numChildren();
          var photo = snap.child("image").val();
          var check = snap.child("likes_id");
          // var toggle=false;
          // console.log("-----" + check);
          // check.forEach(function(el) {
          //   if(el.like==id)
          //   console.log(el);
          // });
          //console.log(photo)
          var ob = { key, name, text, id, totalans, photo, like, check };
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
