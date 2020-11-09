const { Post } = require("../models");

const postData = [
  {
    title: "MVP paradigm",
    content: "A minimum viable product is a version of a product with just enough features to  product is a version of a product with just  be usable by early customers who can then provide feedback ",
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
