const models = require('../models');
const Merchant = models.merchants;

/* GET users listing. */
const getAllMerchants = async(req, res, next) => {
  const merchants = await Merchant.findAll();
  return res.json({merchants});
};

const getMerchantById = async(req, res, next) => {
  const id = req.params.id.toString();
  const merchant = await Merchant.findById(id);
  if (merchant) {
    return res.json({ merchant });
  } else {
    return res.json({ error: `No merchant found with id = ${id}` })
  }
};

const createMerchant = async(req, res, next) => {
  try {
    const merchant = await Merchant.create({
      name: req.body.name,
      email: req.body.email,
    });
    return res.json({
      "message": "Created merchant.",
      merchant
    });
  } catch (error) {
    return res.json({ error: error.message })
  }
};

module.exports = { getAllMerchants, getMerchantById, createMerchant };