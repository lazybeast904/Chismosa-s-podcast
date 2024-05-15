const router = require('express').Router();
const { Gossip } = require('../../models');


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
  