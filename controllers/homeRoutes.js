const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/homepage', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'profilePic'],
        },
        {
          model: Comment,
          attributes: ['body'],
        },
      ],
    });

    const usersData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    posts.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

    const users = usersData.get({ plain: true });

    res.render('homepage', { posts, users, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'profilePic'],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'profilePic'],
        },
      ],
    });

    const post = postData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    comments.sort(
      (a, b) => new Date(b.date_created) - new Date(a.date_created)
    );

    console.log(post);
    console.log(comments);

    res.render('comment', {
      post,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    res.render('signup');
  });

  router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post, include: [{ model: Comment }] }],
      });
  
      const user = userData.get({ plain: true });
      user.posts.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
  
      console.log("from profile route", user);
  
      res.render('profile', {
        user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
 router.get('/homepageNotloggedIn', async (req,res) => {
   try{
     console.log("hi")
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'profilePic'],
        },
        {
          model: Comment,
          attributes: ['body'],
        },
      ],
    });
    console.log(postData)
    const posts = postData.map((post) => post.get({ plain: true }));
    posts.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
    //const users = usersData.get({ plain: true });

res.render("homepageNotLoggedIn", { 
  posts, 
 // users 
});
   }catch(err){
     res.status(400).json(err)
   }

 });





module.exports = router;