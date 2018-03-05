'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        allowNull: false,
        unique: true,
        index: true,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        index: true,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      merchant_id: {
        allowNull: false,
        index: true,
        type: Sequelize.INTEGER,
        references: { model: 'merchants', key: 'id' }
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currency: {
        allowNull: false,
        type: Sequelize.ENUM('USD', 'INR', 'GBP', 'EUR')
      },
      mode_of_payment: {
        allowNull: false,
        type: Sequelize.ENUM('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'CHEQUE', 'NET_BANKING', 'OTHER')
      },
      redeemed: {
        allowNull: false,
        defaultValue: 'PENDING',
        type: Sequelize.ENUM('PENDING', 'PROCESSING', 'COMPLETED')
      },
      transaction_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      agreedToPolicy: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      extra_info: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('coupons');
  }
};