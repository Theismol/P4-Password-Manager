
const express = require('express');
const router = express.Router();
const { login, tokenRefresh, logout,verifyTOTPFirstTime, verifyTOTP, generateTOTP} = require('../controllers/authController');



router.post('/login', login);
router.post('/tokenRefresh', tokenRefresh);
router.post('/logout', logout);
router.post('/verifyTOTP', verifyTOTP);
router.get('/generateTOTP', generateTOTP);
router.post('/verifyTOTPFirstTime', verifyTOTPFirstTime);



module.exports = router;