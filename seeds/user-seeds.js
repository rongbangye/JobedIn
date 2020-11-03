const { User } = require("../models");

const userData = [
  {
    username: "lisa",
    email: "lisa@gmail.com",
    password: "p@ssword1",
    picture_url: "uploads/2020-11-02T09:26:49.859Zavatar.png",
  },
  {
    username: "rose",
    email: "rose@gmail.com",
    password: "p@ssword2",
    picture_url: "uploads/2020-11-02T09:26:49.859Zavatar.png",
  },
  {
    username: "rich",
    email: "rich@gmail.com",
    password: "p@ssword3",
    picture_url: "uploads/2020-11-02T09:26:49.859Zavatar.png",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
