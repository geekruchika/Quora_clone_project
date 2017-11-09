export default function(state = { ques_ans: [] }, action = {}) {
  switch (action.type) {
    case "QUES_STARTED":
      return state;
    case "FETCH_QUES_ANS":
      return { ...state, ques_ans: action.payload };
    default:
      return state;
  }
}
