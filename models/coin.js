'use strict';
module.exports = (sequelize, DataTypes) => {
  var Coin = sequelize.define('coins', {
    name: {
      allowNull: false,
      index: true,
      type: DataTypes.STRING 
    },
    code: {
      index: true,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Coin.associate = function(models) {
    // associations can be defined here
  };
  return Coin;
};