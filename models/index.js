// TODO: Import any models and define additional relationships here
const Gossip = require("./gossip");
const User = require('./User');
const userData = require('./../seeds/userData.json')

module.exports = { User, Gossip, userData };
