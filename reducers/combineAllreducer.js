import { combineReducers } from "redux";
import addreducer from "./addreducer.js";
import chatReducer from "./chatReducer";
const allReducers = combineReducers({
  record: addreducer,
  messages: chatReducer
});
export default allReducers;
