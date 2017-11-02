export default function(state = { record: [], answer: [] }, action = {}) {
  switch (action.type) {
    case "FETCH_CONTENT":
      return {
        ...state,
        record: action.payload
      };

      break;
    case "FETCH_ANSWER":
      console.log("Answer fetch");

      return {
        ...state,
        answer: action.payload
      };
      break;
    case "POST_STARTED":
      console.log("started");
      break;
    case "POST_SUCCESS":
      console.log("success");
      break;
    case "POST_FAILED":
      console.log("failed");
      break;
  }

  return state;
}
