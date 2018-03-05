'use strict';
const models = require('../models');
const User = models.users;
const Merchant = models.merchants;

module.exports = (sequelize, DataTypes) => {
  console.log(sequelize);
  const Coupon = sequelize.define('coupons', {
    code: {
      allowNull: false,
      unique: true,
      index: true,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      index: true,
      type: DataTypes.INTEGER,
      references: { model: models.User, key: 'id' }
    },
    merchant_id: {
      allowNull: false,
      index: true,
      type: DataTypes.INTEGER,
      references: { model: models.Merchant, key: 'id' }
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    currency: {
      allowNull: false,
      type: DataTypes.ENUM('USD', 'INR', 'GBP', 'EUR')
    },
    mode_of_payment: {
      allowNull: false,
      type: DataTypes.ENUM('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'CHEQUE', 'NET_BANKING', 'OTHER')
    },
    redeemed: {
      allowNull: false,
      defaultValue: 'PENDING',
      type: DataTypes.ENUM('PENDING', 'PROCESSING', 'COMPLETED')
    },
    transaction_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    agreedToPolicy: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    extra_info: {
      type: DataTypes.JSON
    }
  }, {});
  Coupon.associate = function(models) {
    // associations can be defined here
    Coupon.belongsTo(User);
    Coupon.belongsTo(Merchant);
  };
  return Coupon;
};