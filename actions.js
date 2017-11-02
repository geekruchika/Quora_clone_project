import { connect } from "react-redux";
import axios from "axios";

export function increment() {
  return {
    type: "Increment"
  };
}
export function decrement() {
  return {
    type: "Decrement"
  };
}

export function fetchrecord() {
  type: "fetchRecord";
}

export function postContent() {
  //   return function(dispatch) {
  //     dispatch({ type: "FETCH_CONTENT" });
  // axios
  //   .get("http://localhost:3000/content")
  //   .then(response => {
  //     dispatch({
  //       type: "FETCH_FULFILLED",
  //       payload: response.data
  //     });
  //   })
  //   .catch(err => {
  //     dispatch({ type: "FETCH_REJECTED", payload: err });
  //   });
  //};
}
