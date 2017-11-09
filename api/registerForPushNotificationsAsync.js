import { Permissions, Notifications } from "expo";
const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";
import { SetToken } from "../firebasemethods";

export default (async function registerForPushNotificationsAsync(id) {
  const { status } = await Permissions.askAsync(
    Permissions.REMOTE_NOTIFICATIONS
  );
  let finalStatus = status;
  if (finalStatus !== "granted") {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  if (id != "") {
    SetToken(id, token);
  }
  //   var db = firebase.database().ref("/users/" + id + "/notification/");
  // db.set({
  //   token: token
  // });

  // POST the token to our backend so we can use it to send pushes from there
  return fetch(PUSH_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: {
        value: token
      }
    })
  })
    .then(() => {
      console.log("success");
    })
    .catch(err => {
      console.log(err, "logging post error");
    });
});
