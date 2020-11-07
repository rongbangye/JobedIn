const router = require("express").Router();
const { User, Profile } = require("../../models");
const withAuth = require("../../utils/auth");

// GET api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method
  console.log(req.session);
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => {
      // console.log("hello");
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET api/users/:id
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Profile,
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
          "created_at",
          "updated_at",
        ],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      console.log("hello");
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST /api/users/login
router.post("/login", (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// DELETE /api/users/1
router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
