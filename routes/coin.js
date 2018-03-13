const express = require('express');
const router = express.Router();
const coinsController = require('../controllers/coinsController');

router.get('/update', coinsController.updateAllCoinPricesInDatabase);

router.get('/update/:name', coinsController.updateCoinPriceInDatabase);

router.get('/:name', coinsController.getCoinPriceFromDatabase);

router.post('/', coinsController.addCoin);

router.delete('/', coinsController.deleteCoin);

module.exports = router;