'use strict';
const models = require('../models');

module.exports = () => {
  const User = models.sequelize.define('users', {
    name: {
      allowNull: false,
      type: models.Sequelize.STRING
    },
    email: {
      allowNull: false,
      index: true,
      type: models.Sequelize.STRING
    },
    wallet_address: {
      allowNull: false,
      type: models.Sequelize.STRING
    }
  }, {});
  
  // User.associate = function(models) {
  //   // associations can be defined here
  //   User.hasMany(models.Coupon);
  // };
  return User;
};