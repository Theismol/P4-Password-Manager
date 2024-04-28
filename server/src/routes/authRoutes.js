
const express = require('express');
const router = express.Router();
const { login, tokenRefresh, logout,verifyTOTPFirstTime, verifyTOTP, checkMFA, getCSRF} = require('../controllers/authController');



router.post('/login', login);
router.post('/tokenRefresh', tokenRefresh);
router.post('/logout', logout);
router.post('/verifyTOTP', verifyTOTP);
router.post('/verifyTOTPFirstTime', verifyTOTPFirstTime);
router.get('/checkMFA',checkMFA);
router.get('getCSRF', getCSRF );



module.exports = router;