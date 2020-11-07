const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Vote, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "title",
      "content",
      "created_at",
      "updated_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    order: [["created_at", "DESC"]],
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a Single Post
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at", "updated_at"],
    include: [
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
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a Post
router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    // user_id: req.body.user_id,
    user_id: req.session.user_id
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
router.put("/upvote", withAuth, (req, res) => {
  Vote.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  }).then(() => {
    // then find the post we just voted on
    return Post.findOne({
      where: {
        id: req.body.post_id,
      },
      attributes: [
        "id",
        "title",
        "content",
        "created_at",
        "updated_at",
        // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
          ),
          "vote_count",
        ],
      ],
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
});

// Edit a Post
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a Post
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
