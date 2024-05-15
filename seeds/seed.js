// TODO: Add any additional seeding behavior for models here
const sequelize = require('../config/connection');
const { User, Gossip } = require('../models');

const userData = require('./userData.json');
const gossipData = require('../models/GossipData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = new User(sequelize);
  const gossip = new Gossip(sequelize);

     await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

     await Gossip.bulkCreate(gossipData, {
      individualHooks: true,
      returning: true,
    });

  
  

  process.exit(0);
};

seedDatabase();
