const express = require('express');
const router = express.Router();
const coupons_controller = require('../controllers/coupons_controller');

// router.get('/', async (req, res) => {
//   res.send('Finally you are here!!');
// });

router.post('/valid', coupons_controller.checkCouponValidity);

router.post('/', coupons_controller.createCoupon);

router.get('/', coupons_controller.getAllCoupons);

router.post('/apply', coupons_controller.redeemCoupon)

module.exports = router;
