'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define('merchants', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      index: true,
      type: DataTypes.STRING
    }
  }, {});
  Merchant.associate = function(models) {
    // associations can be defined here
    Merchant.hasMany(models.coupons);
  };
  return Merchant;
};