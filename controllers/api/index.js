const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const profileRoutes = require("./profile-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/profiles", profileRoutes);

module.exports = router;
