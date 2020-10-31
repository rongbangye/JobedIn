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
    ],
  });
});
