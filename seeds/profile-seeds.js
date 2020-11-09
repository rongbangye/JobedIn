const { Profile } = require("../models");

const profileData = [
  {
    skills: "Frontend",
    education: "High School",
    experience: "1 years",
    industry: "IT",
    interest: "sports",
    user_id: "1",
  },
  
];

const seedProfiles = () => Profile.bulkCreate(profileData);

module.exports = seedProfiles;
