const {getPublicKey, getPrivateKey} = require('../controllers/keyExchangeController')
const authenticateToken = require('../middlewares/Auth/jwtMiddleware');
const express = require('express');
const router = express.Router();

router.get('/getPublicKey', authenticateToken, getPublicKey);
router.get('/getPrivateKey',authenticateToken, getPrivateKey)

module.exports = router;