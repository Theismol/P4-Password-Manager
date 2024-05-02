const {getKeys} = require('../controllers/keyExchangeController')
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/Auth/jwtMiddleware');

router.get('/getKeys',authenticateToken, getKeys);

module.exports = router;