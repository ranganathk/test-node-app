const express = require('express');
const { Coupon } = require('../models');
const router = express.Router();

const elements = 'ABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789';

const createRandomSequence = (len) => {
  let string = '';
  for (let i = 1; i <= len; i++) {
    string += elements[Math.floor(elements.length * Math.random())]
  }
  return string;
};

router.get('/', (req, res) => {
  res.send('Finally you are here!!');
});

/* GET home page. */
router.get('/bitcoin', (req, res) => {
  res.json({ work: "maga" });
});

router.post('/valid-bitcoin', (req, res) => {
  // check if coupon code is valid and return validity

  res.json({ state: "Valid" });
});

router.post('/bitcoin', (req, res) => {
  // save request and return status
  Coupon.create({
    code: createRandomSequence(16),
    user_id: req.body.user_id,
    amount: req.body.amount,
    // merchant_id: req.body.merchant_id,
    currency: req.body.currency,
    mode_of_payment: req.body.mode_of_payment,
    transaction_id: createRandomSequence(20)
  }).then((coupon) => {
    res.json({
      'message': 'Coupon created',
      coupon
    });
  })

});

module.exports = router;
