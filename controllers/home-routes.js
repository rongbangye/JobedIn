const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/signup', (req, res) => {
  res.render('signup');
});
router.get('/post/:id', (req, res) => {
  res.render('single-post');
});

module.exports = router;