const seedUsers = require("./user-seeds");
const seedPosts = require("./post-seeds");
const seedVotes = require("./vote-seeds");
const seedComments = require("./comment-seeds");
const seedProfiles = require("./profile-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedPosts();
  console.log("\n----- POSTS SEEDED -----\n");

  await seedVotes();
  console.log("\n----- VOTES SEEDED -----\n");

  await seedComments();
  console.log("\n----- COMMENTS SEEDED -----\n");

  await seedProfiles();
  console.log("\n----- PROFILES SEEDED -----\n");

  process.exit(0);
};

seedAll();
