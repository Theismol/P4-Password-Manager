
const express = require('express');
const router = express.Router();
const {login, tokenRefresh, logout, testCookie} = require('../controllers/authController');



router.post('/login', login);
router.post('/tokenRefresh', tokenRefresh);
router.post('/logout', logout);
router.post('/testCookie', testCookie);


module.exports = router;