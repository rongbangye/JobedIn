const router = require("express").Router();
const { User, Profile } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("profile");
});
// edit profile
router.get("/edit-profile", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("edit-profile");
});

module.exports = router;
