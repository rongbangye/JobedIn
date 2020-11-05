const router = require('express').Router();


router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render('profile');
});
// edit profile
router.get('/edit-profile', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render('edit-profile');
});

module.exports = router;