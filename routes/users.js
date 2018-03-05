const express = require('express');
const models = require('../models');
const router = express.Router();
const User = models.User;

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
    User.build({
      name: req.body.name,
      email: req.body.email
    })
    .then((user) => {
      res.json({
        "message": "Created user.",
        user
      });
    })
  } catch (error) {
    res.json({ error })
  }
});

module.exports = router;
