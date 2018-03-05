'use strict';
const models = require('../models');

module.exports = () => {
  const Merchant = models.sequelize.define('merchants', {
    name: {
      allowNull: false,
      type: models.Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      index: true,
      type: models.Sequelize.STRING
    }
  }, {});
  Merchant.associate = function(models) {
    // associations can be defined here
    Merchant.hasMany(models.Coupon);
  };
  return Merchant;
};