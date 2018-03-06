const models = require('../models');
const User = models.users;
const random = require('../utils/random_sequence_generator');

const getAllUsers = async(req, res, next) => {
  const users = await User.findAll();
  return res.json(users);
};

const getUserById = async(req, res, next) => {
  const id = req.params.id.toString();
  const user = await User.findById(id);
  if (user) {
    return res.json({ user });
  } else {
    return res.json({ error: `No user found with id: ${id}` });
  }
};

const createUser = async(req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      wallet_address: random(10)
    });
    return res.json({
      "message": "Created user.",
      user
    });
  } catch(error) {
    return res.json({
      error: error.message
    });
  }
};

module.exports = { getAllUsers, getUserById, createUser };
