
const express = require('express');
const router = express.Router();
const { login, tokenRefresh, logout,verifyTOTPFirstTime, verifyTOTP, generateTOTP, checkMFA} = require('../controllers/authController');



router.post('/login', login);
router.post('/tokenRefresh', tokenRefresh);
router.post('/logout', logout);
router.post('/verifyTOTP', verifyTOTP);
router.get('/generateTOTP', generateTOTP);
router.post('/verifyTOTPFirstTime', verifyTOTPFirstTime);
router.post('/checkMFA',checkMFA)



module.exports = router;