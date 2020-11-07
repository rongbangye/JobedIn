const { Post } = require("../models");

const postData = [
  {
    title: "test title 1",
    content: "A minimum viable product is a version of a product with just enough features to be usable by early customers who can then provide feedback ",
    user_id: 1,
  },
  {
    title: "test title 2",
    content: "A minimum viable product is a version of a product with just enough features to be usable by early customers who can then provide feedback 2",
    user_id: 2,
  },
  {
    title: "test title 3",
    content: "A minimum viable product is a version of a product with just enough features to be usable by early customers who can then provide feedback  3",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
