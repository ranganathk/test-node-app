'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      index: true,
      type: DataTypes.STRING
    },
    wallet_address: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.coupons);
  };
  return User;
};