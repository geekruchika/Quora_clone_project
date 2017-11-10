import { put, takeEvery, all, call } from "redux-saga/effects";
import { firebase } from "../firebaseconfig";

const watchPost = function* watchPost() {
  yield takeEvery("POST_CONTENT", function*(action) {
    if (action.payload.Content) {
      yield put({ type: "POST_STARTED" });
      try {
        yield call(postContent.bind(this, action.payload));
        yield put({ type: "POST_SUCCESS" });
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
    } else {
      yield put({ type: "POST_FAILED" });
    }
  });
};

export default watchPost;

const postContent = payload => {
  var name = payload.user;
  var uid = payload.uid;
  var content = payload.Content;
  var photo = payload.photo;
  var db = firebase.database().ref("/questions/");
  if (content != "")
    db.push({
      user: name,
      id: uid,
      text: content,
      image: photo
    });
};
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
          var photo = snap.child("image").val();
          var ob = { key, name, text, id, totalans, photo };
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
