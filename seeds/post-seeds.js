const { Post } = require("../models");

const postData = [
  {
    title: "test title 1",
    content: "test content 1",
    user_id: 1,
  },
  {
    title: "test title 2",
    content: "test content 2",
    user_id: 2,
  },
  {
    title: "test title 3",
    content: "test content 3",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
