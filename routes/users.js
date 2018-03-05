const express = require('express');
const models = require('../models');
const router = express.Router();
const User = models.users;
const random = require('../utils/random_sequence_generator');

/* GET users listing. */
router.get('/', (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id.toString();
  User.findById(id)
    .then((user) => {
      if (user) {
        res.json({ user });
      } else {
        res.json({ error: `No user found with id = ${id}` })
      }
    });
});

router.post('/', (req, res) => {
  try {
    User.create({
      name: req.body.name,
      email: req.body.email,
      wallet_address: random(10)
    })
    .then((user) => {
      res.json({
        "message": "Created user.",
        user
      });
    })
  } catch (error) {
    res.json({ error: error.message })
  }
});

module.exports = router;
