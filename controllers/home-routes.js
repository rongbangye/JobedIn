const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const fetch = require("node-fetch");
// const { response } = require("express");
require("dotenv").config();

router.get("/", (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: [
      "id",
      "title",
      "content",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
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
      // pass a single post object into the homepage template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      const user = req.session;
      res.render("homepage", { posts, user, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// single-post

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
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
      // const user = req.session;
      // pass data to template
      res.render("single-post", {
        post,
        //   user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/jobs", async (req, res) => {
  const api_key = process.env.API_KEY;
  const language = req.body.language;
  const city = req.body.city;
  console.log(api_key);
  // const apiURL = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=b7620a25&app_key=${api_key}&results_per_page=10&what=node%20developer&where=usa&content-type=application/json`;

  const apiURL = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=b7620a25&app_key=${api_key}&results_per_page=10&what=${language}%20developer&where=${city}&content-type=application/json`;

  const fetch_response = await fetch(apiURL);
  const json = await fetch_response.json();

  res.send(json);
});

module.exports = router;
