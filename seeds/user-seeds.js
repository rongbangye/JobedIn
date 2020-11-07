const { User } = require("../models");

const userData = [
  {
    username: "lisa",
    email: "lisa@gmail.com",
    password: "p@ssword1",
    picture_url: "uploads/defaultPic.jpg",
  },
  {
    username: "rose",
    email: "rose@gmail.com",
    password: "p@ssword2",
    picture_url: "uploads/defaultPic.jpg",
  },
  {
    username: "rich",
    email: "rich@gmail.com",
    password: "p@ssword3",
    picture_url: "uploads/defaultPic.jpg",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
