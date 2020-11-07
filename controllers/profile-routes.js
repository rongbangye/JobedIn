const router = require("express").Router();
const { User, Profile } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  Profile.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "first_name",
      "last_name",
      "picture_url",
      "city",
      "state",
      "zip_code",
      "country",
      "skills",
      "industry",
      "education",
      "experience",
    ],
  })
    .then((dbProfileData) => {
      const profiles = dbProfileData.map((profile) =>
        profile.get({ plain: true })
      );
      console.log(profiles);
      const user = req.session;
      res.render("profile", { profiles, user, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// edit profile
router.get("/edit-profile/:id", (req, res) => {
  Profile.findAll({
    where: {
      id: req.params.id,
    },
    attributes: [
      "first_name",
      "last_name",
      "picture_url",
      "city",
      "state",
      "zip_code",
      "country",
      "skills",
      "industry",
      "education",
      "experience",
    ],
  })
    .then((dbProfileData) => {
      const profiles = dbProfileData.map((profile) =>
        profile.get({ plain: true })
      );
      console.log(profiles);
      const user = req.session;
      res.render("edit-profile", {
        profiles,
        user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
