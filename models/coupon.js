'use strict';
const models = require('../models');

module.exports = () => {
  console.log(models.sequelize);
  const Coupon = models.sequelize.define('coupons', {
    code: {
      allowNull: false,
      unique: true,
      index: true,
      type: models.Sequelize.STRING
    },
    user_id: {
      allowNull: false,
      index: true,
      type: models.Sequelize.INTEGER,
      references: { model: models.User, key: 'id' }
    },
    merchant_id: {
      allowNull: false,
      index: true,
      type: models.Sequelize.INTEGER,
      references: { model: models.Merchant, key: 'id' }
    },
    amount: {
      allowNull: false,
      type: models.Sequelize.INTEGER
    },
    currency: {
      allowNull: false,
      type: models.Sequelize.ENUM('USD', 'INR', 'GBP', 'EUR')
    },
    mode_of_payment: {
      allowNull: false,
      type: models.Sequelize.ENUM('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'CHEQUE', 'NET_BANKING', 'OTHER')
    },
    redeemed: {
      allowNull: false,
      defaultValue: 'PENDING',
      type: models.Sequelize.ENUM('PENDING', 'PROCESSING', 'COMPLETED')
    },
    transaction_id: {
      allowNull: false,
      type: models.Sequelize.STRING
    },
    agreedToPolicy: {
      allowNull: false,
      defaultValue: false,
      type: models.Sequelize.BOOLEAN
    },
    extra_info: {
      type: models.Sequelize.JSON
    }
  }, {});
  Coupon.associate = function(models) {
    // associations can be defined here
    // Coupon.belongsTo(models.User);
    // Coupon.belongsTo(models.Merchant);
  };
  return Coupon;
};