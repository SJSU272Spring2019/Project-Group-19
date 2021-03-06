const Express = require("express");
const BodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var member = require("./models/members");
var role = require("./models/careerPaths");
var course = require("./models/courses");
var mongoose = require("mongoose");

const uri =
  "mongodb+srv://sanith:hello@272main-ryn9i.mongodb.net/272project?retryWrites=true";
const options = {
  type: "mongodb",
  ssl: true,
  authsource: "admin",
  replicaSet: "canvas-shard-0",
  reconectTries: Number.MAX_VALUE,
  useNewUrlParser: true
};
var app = Express();

app.use(BodyParser.json());
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Mongodb Connection created");
});

//use cors to allow cross origin resource sharing
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var port = 8000;
app.listen(port, () => {
  console.log("Listening at ", port);
});
app.post("/notes", (req, res) => {
  // You'll create your note here.
  res.send("Hello");
});

/* --------------------> Signup <-------------------- */
app.post("/register", (req, res) => {
  console.log("message received ", req.body);
  var m = new member({
    email: req.body.email,
    Role: req.body.Role,
    Experience: req.body.Experience,
    Skills: req.body.Skills,
    Certifications: req.body.Certifications
  });

    console.log("Inside Backend jobsvscount");
    var m = new member({
      email: req.body.email,
      Role: req.body.Role,
      Experience: req.body.Experience,
      Skills: req.body.Skills,
      Certifications: req.body.Certifications
    });
  

  m.save(function(err, result) {
    console.log("inside save member");
    if (err) {
      console.log("error occured", err);
    } else {
      console.log("saved", result);
      let obj = {
        email: result.email,
        role: result.Role
      };
      res.json(obj).status(200);
    }
  });
});

/* --------------------> Find a user <-------------------- */
app.post("/find", (req, res) => {
  console.log("request body received ", req.body);
  member.find({ _id: req.body._id }, (err, results) => {
    if (err) {
      console.log("error ", err);
    } else {
      console.log("received Object", results);
      res.json(results).status(200);
    }
  });
});

/* --------------------> Find All career path <-------------------- */
app.get("/getalldata", async (req, res) => {
  let returnData = {
    roles: [],
    skills: [],
    certification: [],
    onlineCourses: []
  };
  careerRoles = await role.find({});
  console.log("roles", careerRoles);
  returnData.roles = careerRoles;

  skills = await course.find({}, "Skill");
  console.log("skills", skills);
  returnData.skills = skills;

  certification = await course.find({}, "Certification");
  console.log("certification", certification);
  returnData.certification = certification;

  // onlineCourses = await course.find({}, "Title CourseLink");
  // console.log("online courses", onlineCourses);
  // returnData.onlineCourses = onlineCourses;
  res.json(returnData).status(200);
});

/* --------------------> Create a user with details <-------------------- */

app.get("/jobsvscount", async (req, res) => {
  var agg = [
    {$group: {
      _id: "$Role",
      total: {$sum: 1}
    }}
  ];
logs =  await   member.aggregate(agg);
if(!!logs && logs.length){
  res.json(logs).status(200);
    console.log(logs);
}

  })
/* --------------------> Get courses and its relative courses with details <-------------------- */
app.post("/getcourses", (req, res) => {
  console.log("request body received ", req.body);
  member.findOne({ email: req.body.email }, (err1, memberResults) => {
    if (err1) {
      res.status(400).json({ message: "Error in finding the email in member" });
      console.log("error ", err1);
    } else {
      course.find(
        { Careerpath: memberResults.Role },
        "Title Courselink",
        (err2, courseResult) => {
          if (err2) {
            console.log(
              "Error in finding the courses pertaining to CareerPath",
              err2
            );
            res.status(400).json({
              message: "Error in finding the courses pertaining to CareerPath"
            });
          } else {
            console.log("Result ", courseResult);
            res.status(200).send(courseResult);
          }
        }
      );
    }
  });
});

/* --------------------> Get skills and its relative courses with details <-------------------- */
app.post("/getskills", (req, res) => {
  console.log("request body received ", req.body);
  member.findOne({ email: req.body.email }, (err1, memberResults) => {
    if (err1) {
      res.status(400).json({ message: "Error in finding the email in member" });
      console.log("error ", err1);
    } else {
      console.log("this is result", memberResults);
      course.find(
        { Careerpath: memberResults.Role },
        "Skill",
        (err2, courseResult) => {
          if (err2) {
            console.log("Error in finding the Skills", err2);
            res.status(400).json({
              message: "Error in finding the courses pertaining to CareerPath"
            });
          } else {
            let skillset = courseResult.map(e => e.Skill);
            let otherskills = skillset.filter(
              f => !memberResults.Skills.includes(f)
            );
            let finalData = {
              presentSkills: memberResults.Skills,
              neededSkills: otherskills
            }
            res.status(200).send(finalData);
          }
        }
      );
    }
  });
});
