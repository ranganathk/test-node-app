const express = require('express');
const router = express.Router();
const merchants_controller = require('../controllers/merchants_controller');

/* GET users listing. */
router.get('/', merchants_controller.getAllMerchants);

router.get('/:id', merchants_controller.getMerchantById);

router.post('/', merchants_controller.createMerchant);

module.exports = router;
