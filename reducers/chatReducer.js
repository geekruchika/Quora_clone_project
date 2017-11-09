export default function(state = { messages: [] }, action = {}) {
  switch (action.type) {
    case "CHAT_STARTED":
      return state;
    case "FETCH_MESSAGE":
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}
