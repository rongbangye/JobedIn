const router = require("express").Router();
const { Profile, Post, User } = require("../../models");

// Get /profiles/:id
router.get("/:id", (req, res) => {
  Profile.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "skills",
      "education",
      "experience",
      "industry",
      "interest",
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
router.post("/", (req, res) => {
  Profile.create({
    skills: req.body.skills,
    education: req.body.education,
    experience: req.body.experience,
    industry: req.body.industry,
    interest: req.body.interest,
    user_id: req.body.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Put/Update profile
router.put("/:id", (req, res) => {
  Profile.update(
    {
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
