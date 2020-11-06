const router = require("express").Router();
const { Profile, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");
// const { v4: uuid } = require("uuid");

// const multer = require("multer");
// const storage = multer.memoryStorage({
//   destination: function (req, file, callback) {
//     callback(null, "");
//   },
// });
// var upload = multer({ storage });

// const AWS = require("aws-sdk");
// const s3 = new AWS.S3({
//   accessKeyId: process.env.aws_accesskey,
//   secretAccessKey: process.env.aws_secretkey,
// });
// let fs = require("fs");

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
// router.post("/", upload.single("picture_url"), withAuth, (req, res) => {
//   let myFile = req.file.originalname.split(".");
//   const fileType = myFile[myFile.length - 1];
//   console.log(req.file);

//   const params = {
//     Bucket: process.env.aws_bucket,
//     Key: `${uuid()}.${fileType}`,
//     Body: req.file.buffer,
//   };

//   s3.upload(params, (error, data) => {
//     if (error) {
//       res.status(500).send(error);
//     }

//     res.status(200).send(data);
//   });
// });

router.post("/", (req, res) => {
  Profile.create({
    // picture_url: req.file.path,
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
    user_id: req.session.user_id,
  })
    .then((dbProfileData) => {
      req.session.save(() => {
        // declare session variables
        req.session.hasProfile = true;

        res.json(dbProfileData);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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
      industry: req.body.industry,
      education: req.body.education,
      experience: req.body.experience,
      user_id: req.session.user_id,
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
