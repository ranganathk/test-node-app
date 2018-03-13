const express = require('express');
const router = express.Router();
const merchantsController = require('../controllers/merchantsController');

/* GET users listing. */
router.get('/', merchantsController.getAllMerchants);

router.get('/:id', merchantsController.getMerchantById);

router.post('/', merchantsController.createMerchant);

module.exports = router;
