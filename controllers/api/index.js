// TODO: Change or add any API routes here.

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gossipRoutes = require('./gossipRoutes');

router.use('/users', userRoutes);
router.use('/gossip', gossipRoutes);

module.exports = router;
