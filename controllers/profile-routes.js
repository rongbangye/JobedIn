const router = require("express").Router();
const { User, Profile, Post } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  Profile.findAll({
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
  })
    .then((dbProfileData) => {
      Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        attributes: ["title", "content", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      }).then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        const profiles = dbProfileData.map((profile) =>
          profile.get({ plain: true })
        );
        // const profiles = dbProfileData.get({ plain: true });
        console.log(profiles);
        console.log(posts);
        const user = req.session;
        res.render("profile", {
          profiles,
          user,
          posts,
          loggedIn: req.session.loggedIn,
        });
      });
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
// edit post
router.get("/edit-post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("edit-post", {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
