const router = require("express").Router();
const { User, Profile } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/profile", withAuth, (req, res) => {
  console.log(req.session);
  Profile.findOne({
    where: {
      user_id: req.session.user_id,
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
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((dbProfileData) => {
    const profile = dbProfileData.get({ plain: true });
    res.render("profile", { profile, loggedIn: req.session.loggedIn });
  });
});
// edit profile
router.get("/profile/edit-profile", (req, res) => {
  res.render("edit-profile");
});

module.exports = router;
