const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users_controller');

/* GET users listing. */
router.get('/', users_controller.getAllUsers);

router.get('/:id', users_controller.getUserById);

router.post('/', users_controller.createUser);

module.exports = router;
