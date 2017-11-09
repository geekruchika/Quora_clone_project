export default function(state = { record: [], answer: [] }, action = {}) {
  switch (action.type) {
    case "FETCH_CONTENT":
      return {
        ...state,
        record: action.payload
      };
    case "FETCH_ANSWER":
      return {
        ...state,
        answer: action.payload
      };
    case "POST_STARTED":
      return state;

    case "POST_SUCCESS":
      return state;
    case "POST_FAILED":
      return state;
    default:
      return state;
  }
}
