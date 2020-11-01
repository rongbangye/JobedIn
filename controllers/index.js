const router = require('express').Router();
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');

router.use('/',homeRoutes);
router.use('/',profileRoutes);

module.exports = router;