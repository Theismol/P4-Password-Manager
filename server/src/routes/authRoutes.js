
const express = require('express');
const router = express.Router();
const { login, tokenRefresh, logout } = require('../controllers/authController');



router.post('/login', login);
router.post('/tokenRefresh', tokenRefresh);
router.post('/logout', logout);



module.exports = router;