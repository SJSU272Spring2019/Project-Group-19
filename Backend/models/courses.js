var mongoose = require("mongoose");

const courses = new mongoose.Schema({
  "Career Path": {
    type: String
  },
  Skill: {
    type: String
  },
  Title: {
    type: String
  },
  "Course Link": {
    type: String
  },
  Certification: {
    type: String
  }
});
var course = mongoose.model("course", courses);
module.exports = course;
