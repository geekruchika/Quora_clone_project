export default function(state = { messages: [] }, action = {}) {
  switch (action.type) {
    case "CHAT_STARTED":
      console.log("chat messages");
      break;
    case "FETCH_MESSAGE":
      console.log("chat messages Fetch");
      console.log(action.payload);
      return { ...state, messages: action.payload };
      break;
  }

  return state;
}
