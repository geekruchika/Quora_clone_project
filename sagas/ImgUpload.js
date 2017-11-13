import { put, takeEvery, all, call } from "redux-saga/effects";
import { firebase } from "../firebaseconfig";

const imagePost = function* imagePost() {
  console.log("in saga");
  yield takeEvery("IMAGE_UPLOAD", function*(action) {
    try {
      yield call(postContent.bind(this, action.payload));
      var data = yield call(getContent);
      console.log(data);
      yield put({
        type: "FETCH_CONTENT",
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  });
};

export default imagePost;

const postContent = payload => {
  console.log("in post");
  var photo = payload.photo;
  var db = firebase.database().ref("/questions/");

  db
    .orderByKey()
    .once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(snap) {
        if (payload.id == snap.child("id").val()) {
          console.log("image update");
          var newref = firebase.database().ref("/questions/" + snap.key);
          newref.update({
            image: photo
          });
        }
      });
    });
};
const getContent = () => {
  var ques = [];
  var db = firebase.database().ref("/questions/");
  console.log("in get");
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
