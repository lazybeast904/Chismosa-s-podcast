// TODO: Add any additional seeding behavior for models here
const sequelize = require('../config/connection');
const { User, Gossip } = require('../models');

const userData = require('./userData.json');
const gossipData = require('./gossipData.json')

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
    })

    for (const user of userData) {
    await User.create({
      //id: 1,
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      isAdmin: true,
    });
  }
    // for (const user of userData) {
    // await User.create({
    //   //id: 1,
    //   name: 'Admin',
    //   email: process.env.ADMIN_EMAIL,
    //   password: process.env.ADMIN_PASSWORD,
    //   isAdmin: true,
    // });
  

  process.exit(0);
};

seedDatabase();
