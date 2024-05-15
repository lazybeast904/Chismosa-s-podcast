
const router = require('express').Router();
const { Gossip,User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
        //   include: [
        //     {
        //       model: User,
        //     attributes: { exclude: ['password'] },
        //     order: [['name', 'ASC']],
        //     },
        //   ],
        // });
        
        const users = userData.map((user) => user.get({ plain: true }));
        
        res.render('homepage', {
            users,
            // Pass the logged in flag to the template
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Gossip,
          attributes: { exclude: ['password'] },
          order: [['name', 'ASC']],
        },
      ],
    });
    const user = userData.get({ plain: true });

    res.render('user', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const gossipData = await Gossip.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const gossip = gossipData.map((gossip) => gossip.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects: gossip, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/gossip/:id', async (req, res) => {
  try {
    const gossipData = await Gossip.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const gossip = gossipData.get({ plain: true });

    res.render('gossip', {
      ...gossip,
      logged_in: req.session.logged_in
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
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Prevent non logged in users from viewing the dashboard
router.get('/homepage', withAuth, async (req, res) => {
    try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: User }],
    });

    const user = userData.get({ plain: true });
    res.render('homepage', {
      ...user,
      // Pass the logged in flag to the template
      logged_in: true,
      // logged_in: req.session.logged_in,
      // isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

module.exports = router;
