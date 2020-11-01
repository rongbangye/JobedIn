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
  {
    skills: "BackEnd",
    education: "College",
    experience: "2 years",
    industry: "IT",
    interest: "Coffee",
    user_id: "2",
  },
  {
    skills: "FullStack",
    education: "Master",
    experience: "3 years",
    industry: "IT",
    interest: "Read",
    user_id: "3",
  },
];

const seedProfiles = () => Profile.bulkCreate(profileData);

module.exports = seedProfiles;
