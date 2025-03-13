const express = require('express');
const router = express.Router();
const userController = require('@controllers/userController');

router.post('/', userController.register);
router.get('/:email', userController.getUser);

module.exports = router;
