// import all models
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");
const Profile = require("./Profile");
const Like = require("./Like");

// create associations
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

User.belongsTo(Profile, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Profile.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.hasMany(Like, {
  foreignKey: "post_id",
});

Like.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

module.exports = { User, Post, Comment, Profile, Like };
