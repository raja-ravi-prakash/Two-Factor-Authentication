const speakeasy = require("speakeasy");

var secret = speakeasy.generateSecret({
  name: "Ronin",
});

console.log(secret);
