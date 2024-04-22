// const admin = require("firebase-admin");
// const serviceAccount = require("../config/quant11-firebase-adminsdk.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://firebase-app-465c4.firebaseio.com",
// });
// const sendNotification = async (message, tokens) => {
//   const payload = {
//     notification: {
//       title: "Quant11",
//       body: message,
//       content_available: "true",
//       image:
//         "https://firebasestorage.googleapis.com/v0/b/tce-quant11.appspot.com/o/Frame.png?alt=media&token=7f953f2b-b785-4475-b373-bc771d986d1a",
//       click_action: "https://dashboard.quant11.com",
//     },
//   };
//   const options = {
//     priority: "high",
//   };
//   // console.log(payload);
//   return admin
//     .messaging()
//     .sendToDevice(tokens, payload, options)
//     .then(function (response) {
//       return true;
//     })
//     .catch(function (error) {
//       console.log(error);
//       return true;
//     });
// };

// module.exports = {
//   sendNotification,
// };
