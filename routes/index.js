const express = require('express');
const models = require('../models');
const router = express.Router();
const Coupon = models.coupons;
const random = require('../utils/random_sequence_generator');

router.get('/', async (req, res) => {
  res.send('Finally you are here!!');
});

module.exports = router;
