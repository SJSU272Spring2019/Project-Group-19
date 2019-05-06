var mongoose = require("mongoose");

const careerPaths = new mongoose.Schema({
  Career_Path: {
    type: String
  }
});
var c = mongoose.model("c", careerPaths);
module.exports = c;
