const router = require('express').Router();
const { Gossip } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const gossip = await Gossip.findAll({});

    res.json(gossip);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
  });

  router.post('/', async (req, res) => {
    try {
      const dbUserData = await Gossip.create({
        title: req.body.title,
        story: req.body.story,
        source: req.body.source,
        // user: req.body.user
      });
  
      // Set up sessions with a 'loggedIn' variable set to `true`
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
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

  module.exports = router;