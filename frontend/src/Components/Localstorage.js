var jwt = require("jsonwebtoken");

module.exports.setEmail = email => {
  //Storing token in the local storage
  localStorage.setItem("email", JSON(email));
};

module.exports.setRole = role => {
  //Storing token in the local storage
  localStorage.setItem("career", JSON(role));
};

module.exports.getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};
