const router = require("express").Router();
const { Profile, Post, User } = require("../../models");
const multer = require("multer");

const awsSDK = require("aws-sdk");
const { response } = require("express");
var upload = multer({ dest: "uploads/" });
let fs = require("fs");

const withAuth = require("../../utils/auth");

awsSDK.config.update({
  accessKeyId: process.env.aws_accesskey,
  secretAccessKey: process.env.aws_secretkey,
});
// Get /profiles/:id
router.get("/:id", (req, res) => {
  Profile.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "picture_url",
      "first_name",
      "last_name",
      "city",
      "state",
      "country",
      "zip_code",
      "skills",
      "education",
      "experience",
      "industry",
      "interest",
      "user_id",
      "created_at",
      "updated_at",
    ],
  })
    .then((dbProfileData) => {
      if (!dbProfileData) {
        res.status(404).json({ message: "No profile found with this id" });
        return;
      }
      res.json(dbProfileData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Post /profiles
router.post("/", upload.single("image"), withAuth, (req, res) => {
  console.log("image", req.file);

  const s3 = new awsSDK.S3();
  fs.readFile(`uploads/${req.file.filename}`, function (er, d) {
    s3.putObject(
      {
        Bucket: "jobedin-bucket",
        Key: req.file.filename,
        Body: d,
      },
      function (err, data) {
        if (err) {
          console.log("There was an error: ", err);
          return res.status(500).send({
            success: false,
            message: "Error saving fil to aws",
            error: err,
          });
        }
        res.status(200).send({
          message: "File uplioad to aws",
          data: data,
          file: req.file,
        });
      }
    );
  });
  // Profile.create({
  //   picture_url: req.file.path,
  //   first_name: req.body.first_name,
  //   last_name: req.body.last_name,
  //   city: req.body.city,
  //   state: req.body.state,
  //   country: req.body.country,
  //   zip_code: req.body.zip_code,
  //   skills: req.body.skills,
  //   education: req.body.education,
  //   experience: req.body.experience,
  //   industry: req.body.industry,
  //   interest: req.body.interest,
  //   user_id: req.body.user_id,
  // })
  //   .then((dbPostData) => res.json(dbPostData))
  //   .catch((err) => {
  //     res.status(500).json(err);
  //   });
});

// Put/Update profile
router.put("/:id", (req, res) => {
  Profile.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zip_code: req.body.zip_code,
      skills: req.body.skills,
      education: req.body.education,
      experience: req.body.experience,
      industry: req.body.industry,
      interest: req.body.interest,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbProfileData) => {
      if (!dbProfileData) {
        res.status(404).json({ message: "No Profile found with this id" });
        return;
      }
      res.json(dbProfileData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
