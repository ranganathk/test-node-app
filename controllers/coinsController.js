const fetch = require('node-fetch');
const asyncForEach = require('async-foreach').forEach;
const models = require('../models');
const Coin = models.coins;
const url = 'https://api.coinmarketcap.com/v1/ticker/';

const getCoinNames = async() => {
  return Coin.findAll({
    attributes: ['name']
  })
  .map((coin) => coin.dataValues.name);
};

const getAllCoinPricesFromCoinMarket = async (req, res, next) => {
  try {
    let coin_data_promises = [];
    let coin_json_promises = [];

    const coin_names = await getCoinNames();

    coin_names.forEach((coin) => {
      const coin_url = `${url}${coin}/`;
      coin_data_promises.push(fetch(coin_url));
    });
    const resps = await Promise.all(coin_data_promises);
    resps.forEach((resp) => {
      coin_json_promises.push(resp.json());
    });

    await Promise.all(coin_json_promises);
    return res.json({ 'success': 'All Coins updated successfully.' });
  } catch (error) {
    return res.json({ error });
  }
};

const getCoinPriceFromCoinMarketAndAddCoinToDatabase = async (req, res, next) => {
  try {
    const name = req.body.name;
    const coin_url = `${url}${name}/`;
    const data = await fetch(coin_url);
    const coin_data = await data.json();
    const coin = await Coin.create({
      name: coin_data[0].id,
      code: coin_data[0].symbol,
      price: coin_data[0].price_usd
    });
    return res.json({ 'success': 'Coin added successfully.' });
  } catch (error) {
    return res.json({ error });
  }
};

const updateCoinPriceFromCoinMarket = async(req, res, next) => {
  try {
    const name = req.params.name;
    const coin_url = `${url}${name}/`;
    const data = await fetch(coin_url);
    const coin_data = await data.json();
    const coin = await Coin.findOne({
      where: {
        name: coin_data[0].id,
      }
    });
    coin.price = coin_data[0].price_usd;
    await coin.save();
    return res.json({ 'success': 'Coin updated successfully.' })
  } catch (error) {
    return res.json({ error });
  }
};

const addCoin = async(req, res, next) => {
  const name = req.body.name;
  const coin_names = await getCoinNames();
  if (coin_names.indexOf(name) >= 0) {
    return res.json({ 'note': 'Coin already exists' });
  } else {
    return await getCoinPriceFromCoinMarketAndAddCoinToDatabase(req, res, next);
  }
};

const deleteCoin = async(req, res, next) => {
  const name = req.body.name;
  const coin_names = await getCoinNames();

  if (coin_names.indexOf(name) >= 0) {
    const coin = await Coin.destroy({
      where: {
        name
      }
    });
    return res.json({ 'success': 'Coin successfully deleted' });
  } else {
    return res.json({ 'error': 'No such coin in the database' });
  }
};

const getCoinPriceFromDatabase = async(req, res, next) => {
  const name = req.params.name;
  const coin_names = await getCoinNames();

  if (coin_names.indexOf(name) >= 0) {
    const coin = await Coin.findOne({
      where: {
        name
      }
    });
    return res.json({ coin });
  } else {
    return res.json({ error: 'No such coin in database. Kindly add the coin before trying to fetch it.' })
  }
};

const updateAllCoinPricesInDatabase = async(req, res, next) => {
  const coins_data = await getAllCoinPricesFromCoinMarket(req, res, next);

  for(let i = 0; i < coins_data.length; i++) {
    const coin_data = coins_data[i];
    const coin = await Coin.findOne({
      where: {
        name: coin_data[0].id
      }
    });
    coin.price = coin_data[0].price_usd;
    await coin.save();
  }
};

const updateCoinPriceInDatabase = async(req, res, next) => {
  const name = req.params.name;
  const coin_names = await getCoinNames();

  if (coin_names.indexOf(name) >= 0) {
    return updateCoinPriceFromCoinMarket(req, res, next);
  } else {
    return res.json({ error: 'No such coin exists in database' });
  }
};

module.exports = { updateAllCoinPricesInDatabase, updateCoinPriceInDatabase, getCoinPriceFromDatabase, addCoin, deleteCoin };
