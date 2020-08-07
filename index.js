const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const serviceAccount = require("./key.json");
const admin = require("firebase-admin");
const speakease = require("speakeasy");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ronin-admin.firebaseio.com",
});

app.use(cors());
app.use(bodyparser.json());
app.use(express.static("static"));

function getToken(email) {
  return admin.firestore().collection("tokens").doc(email).get();
}

app.post("/twof2", async (req, res) => {
  let email = req.body.mail;
  let pass = req.body.pass;
  let token = await getToken(email);
  token = token.data().token;
  let result = speakease.totp.verify({
    secret: token,
    encoding: "base32",
    token: pass,
  });
  res.send(result);
});

app.post("/new", async (req, res) => {
  let email = req.body.mail;
  var secret = speakease.generateSecret({
    name: "Ronin",
  }).base32;
  admin.firestore().collection("tokens").doc(email).set({
    token: secret,
  });
  res.send(secret);
});

app.listen(8080, () => {
  console.log("Server started at localhost:8080");
});
