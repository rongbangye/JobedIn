const router = require("express").Router();
const { Profile, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

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
    include: [
      {
        model: Post,
        attributes: ["title", "content"],
      },
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

// Create a profile
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

// Update profile
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
