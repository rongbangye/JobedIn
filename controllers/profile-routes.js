const router = require('express').Router();


router.get('/profile', (req, res) => {
  res.render('profile');
});
// edit profile
router.get('/profile/edit-profile', (req, res) => {
  res.render('edit-profile');
});

module.exports = router;