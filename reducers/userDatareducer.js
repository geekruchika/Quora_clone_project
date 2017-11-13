export default function(state = { user: [] }, action = {}) {
  switch (action.type) {
    case "USER_DETAIL":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
