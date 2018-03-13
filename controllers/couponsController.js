const models = require('../models');
const random = require('../utils/random_sequence_generator');
const Coupon = models.coupons;

const createCoupon = async(req, res, next) => {
  try {
    const coupon = await Coupon.create({
      code: random(16),
      userId: req.body.userId,
      amount: req.body.amount,
      merchantId: req.body.merchantId,
      currency: req.body.currency,
      mode_of_payment: req.body.mode_of_payment,
      transaction_id: random(20)
    });
    return res.json({
      message: 'Coupon created',
      coupon
    });
  } catch(error) {
    return res.json({
      error: error.message
    });
  }
};

const checkCouponValidity = async(req, res, next) => {
  const coupon = await Coupon.findOne({
    where: {
      code: req.body.coupon_code
    }
  });

  if (!coupon) {
    return res.json({
      error: 'No such coupon exists'
    });
  }

  if (coupon.redeemed === 'PENDING') {
    return res.json({
      message: 'Coupon is valid',
      coupon
    })
  } else {
    return res.json({
      error: 'Coupon is invalid',
      coupon
    });
  } 
};

const getAllCoupons = async(req, res, next) => {
  const coupons = await Coupon.findAll();
  return res.json({ coupons });
};

const redeemCoupon = async(req, res, next) => {
  const coupon = await Coupon.findOne({
    where: {
      code: req.body.coupon_code
    }
  });

  if (!coupon) {
    return res.json({
      error: 'No such coupon exists'
    });
  }

  if (coupon.redeemed === 'PENDING') {
    coupon.redeemed = 'PROCESSING';
    const updated_coupon = await coupon.save({ fields: ['redeemed'] });

    return res.json({
      message: 'Coupon being processed',
      updated_coupon
    });
  } else {
    return res.json({
      error: 'Coupon is invalid',
      coupon
    });
  }
};

module.exports = { createCoupon, getAllCoupons, checkCouponValidity, redeemCoupon };