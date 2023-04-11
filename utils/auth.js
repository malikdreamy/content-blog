const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/homepageNotLoggedIn');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  