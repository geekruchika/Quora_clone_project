export default function(state = { message: [] }, action = {}) {
  switch (action.type) {
    case "CHAT_STARTED":
      console.log("chat messages");
      break;
    case "Fetch_message":
      console.log("chat messages Fetch");
      console.log(action.payload);
      return { ...state, message: action.payload };
      break;
  }

  return state;
}
