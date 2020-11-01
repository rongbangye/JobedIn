const { User } = require("../models");

const userData = [
  {
    username: "lisa",
    email: "lisa@gmail.com",
    password: "p@ssword1",
  },
  {
    username: "rose",
    email: "rose@gmail.com",
    password: "p@ssword2",
  },
  {
    username: "rich",
    email: "rich@gmail.com",
    password: "p@ssword3",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
