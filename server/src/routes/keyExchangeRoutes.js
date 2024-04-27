const {getPublicKey, getPrivateKey} = require('../controllers/keyExchangeController')
const express = require('express');
const router = express.Router();

router.get('/getPublicKey', getPublicKey);
router.get('/getPrivateKey', getPrivateKey)

module.exports = router;