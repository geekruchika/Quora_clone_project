import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";
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

const chatData = function* chatData() {
  yield takeEvery("CHAT_CONTENT", function*(action) {
    yield put({ type: "CHAT_STARTED" });
    try {
      console.log(action.payload);
      yield call(chatContent.bind(this, action.payload));
      yield put({ type: "POST_SUCCESS" });

      var data = yield call(getChat.bind(this, action.payload));
      console.log(data);
      yield put({
        type: "FETCH_MESSAGE",
        payload: data
      });
    } catch (error) {
      yield put({ type: "POST_FAILED" });
    }
  });
};

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

const rootSaga = function* rootSaga() {
  yield [
    watchPost(),
    watchAnswer(),
    atStart(),
    atStartAnswer(),
    chatData(),
    chatgetData(),
    quesAns()
  ];
};

export default rootSaga;

const postContent = payload => {
  var name = payload.user;
  var uid = payload.uid;
  var content = payload.Content;
  var db = firebase.database().ref("/questions/");
  if (content != "")
    db.push({
      user: name,
      id: uid,
      text: content
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
          var text = snap.child("text").val();
          var name = snap.child("user").val();
          var id = snap.child("id").val();
          var ob = { key, name, text, id };
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
  console.log("in the getchat block");
  console.log(payload);
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
        console.log(messages);
        resolve(messages);
      })
      .catch(error => {
        reject(error);
      });
  });
};

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
          // console.log(ques);
          // console.log(ob);
          if (ob.length > 0) {
            var data = { ques, ob };
            ques_ans.push(data);
          }
        });
        //console.log(ques_ans);
        //thisref.setState({ ques_ans: ques_ans });
        resolve(ques_ans);
      });
  });
};
