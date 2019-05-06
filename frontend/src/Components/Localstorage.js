var jwt = require("jsonwebtoken");

module.exports.setEmail = email => {
  //Storing token in the local storage
  localStorage.setItem("email", JSON.stringify(email));
};
module.exports.getEmail = () => {
  return JSON.parse(localStorage.getItem("email"));
};


module.exports.setRole = role => {
  //Storing token in the local storage
  localStorage.setItem("career", JSON.stringify(role));
};

module.exports.getRole = () => {
  return JSON.parse(localStorage.getItem("career"));
};
