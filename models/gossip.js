const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gossip extends Model {}

Gossip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Anonymous',
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    story: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'gossip',
  }
);

module.exports = Gossip;