import { put, takeEvery, all, call } from "redux-saga/effects";
const user = function* User() {
  yield takeEvery("USER_RECORD", function*(action) {
    try {
      console.log("user detail");
      //console.log(action.payload);
      yield put({
        type: "USER_DETAIL",
        payload: action.payload
      });
    } catch (error) {
      console.log(error);
    }
  });
};

export default user;
