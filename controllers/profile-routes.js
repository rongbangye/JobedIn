const router = require('express').Router();


router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render('profile');
});
// edit profile
router.get('/edit-profile/:id', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render('edit-profile');
});
// edit post
router.get('/edit-post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at'
     ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('edit-post', {
        post,
        loggedIn: true
       });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;