const express = require('express');
const { Coupon } = require('../models');
const router = express.Router();
const Coupon = models.coupons;
const random = require('../utils/random_sequence_generator');

router.get('/', (req, res) => {
  res.send('Finally you are here!!');
});

// /* GET home page. */
// router.get('/bitcoin', (req, res) => {
//   res.json({ work: "maga" });
// });

router.post('/valid-bitcoin', (req, res) => {
  // check if coupon code is valid and return validity

  res.json({ state: "Valid" });
});

router.post('/bitcoin', (req, res) => {
  // save request and return status
  try {
    Coupon.create({
      code: random(16),
      userId: req.body.userId,
      amount: req.body.amount,
      merchantId: req.body.merchantId,
      currency: req.body.currency,
      mode_of_payment: req.body.mode_of_payment,
      transaction_id: random(20)
    }).then((coupon) => {
      console.log('Hi i made coupon');
      res.json({
        'message': 'Coupon created',
        coupon
      });
    });
  } catch(error) {
    res.json({ error });
  }
});

router.get('/bitcoins', (req, res) => {
  Coupon.findAll().then((coupons) => {
    res.json(coupons);
  });
});

module.exports = router;
