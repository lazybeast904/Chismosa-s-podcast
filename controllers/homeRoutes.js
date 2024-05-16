const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });
        
        const users = userData.map((project) => project.get({ plain: true }));
        
        res.render('homepage', {
            users,
            // Pass the logged in flag to the template
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/main', withAuth, async (req, res) => {
  try {
    // Render the 'main' view with any necessary data
    res.render('main', {
      // Pass data to the view if needed
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Prevent non logged in users from viewing the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });
    res.render('dashboard', {
      user,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/about', async (req, res) => {
  try {
    // Render the 'about' view with the loggedIn status
    res.render('about', {
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
