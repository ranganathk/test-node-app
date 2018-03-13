const express = require('express');
const router = express.Router();
const couponsController = require('../controllers/couponsController');

// router.get('/', async (req, res) => {
//   res.send('Finally you are here!!');
// });

router.post('/valid', couponsController.checkCouponValidity);

router.post('/', couponsController.createCoupon);

router.get('/', couponsController.getAllCoupons);

router.post('/apply', couponsController.redeemCoupon)

module.exports = router;
