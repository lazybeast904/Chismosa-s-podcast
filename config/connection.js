const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.podcast_db,
    process.env.myuser,
    process.env.mypassword,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );


module.exports = sequelize;
