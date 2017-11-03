import { combineReducers } from "redux";
import addreducer from "./addreducer.js";
import chatReducer from "./chatReducer";
import ques_ansreducer from "./ques_ansreducer";

const allReducers = combineReducers({
  record: addreducer,
  messages: chatReducer,
  ques_ans: ques_ansreducer
});
export default allReducers;
