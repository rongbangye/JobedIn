// import all models
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");
const Profile = require("./Profile");
const Vote = require("./Vote");

// create associations
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

// added Profile with Post
Profile.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(Profile, {
  foreignKey: "user_id",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

// Added Vote belongsTo User
Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Vote, {
  foreignKey: "post_id",
});

// Added User hasMany Vote
User.hasMany(Vote, {
  foreignKey: "user_id",
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

/**
 * Comment out below code
 * Because received error with this:
 * "Cyclic dependency found. user is dependent of itself"
 *  */

User.hasOne(Profile, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// Profile.hasOne(User, {
//   foreignKey: "user_id",
//   onDelete: "SET NULL",
// });

module.exports = { User, Post, Comment, Profile, Vote };
