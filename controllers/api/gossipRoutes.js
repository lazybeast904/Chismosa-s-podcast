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
    const newGossip = await Gossip.create({
      title: req.body.title,
      story: req.body.story,
      source: req.body.source,
      user: req.body.user,
    });
    res.status(200).json(newGossip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
  
router.get('/:id', async (req, res) => {
  try {
      const gossipData = await Gossip.findByPk(req.params.id);
      
      if (!gossipData) {
          return res.status(404).json({ message: 'Gossip not found' });
      }

      const gossip = gossipData.get({ plain: true });

      res.json(gossip);

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
      const gossipData = await Gossip.findByPk(req.params.id);
      
      if (!gossipData) {
          return res.status(404).json({ message: 'Gossip not found' });
      }

      // Perform the deletion of the gossip entry
      await gossipData.destroy();

      res.json({ message: 'Gossip deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
});



  module.exports = router;
  