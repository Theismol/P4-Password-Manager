
const express = require('express');
const router = express.Router();
const { login,getUserKey, exntionCheckLogin, checkMasterPassword, tokenRefresh, logout,verifyTOTPFirstTime, verifyTOTP, checkMFA, getCSRF} = require('../controllers/authController');
const authenticateToken = require('../middlewares/Auth/jwtMiddleware');



router.post('/login', login);
router.post('/tokenRefresh', tokenRefresh);
router.post('/logout', logout);
router.post('/verifyTOTP', authenticateToken, verifyTOTP);
router.post('/verifyTOTPFirstTime',authenticateToken, verifyTOTPFirstTime);
router.post('/checkMasterPassword', authenticateToken, checkMasterPassword);
router.get('/checkMFA',authenticateToken,checkMFA);
router.get('/exntionCheckLogin', authenticateToken, exntionCheckLogin);
router.get('/getCSRF', authenticateToken, getCSRF);
router.get('/getUserKey', authenticateToken, getUserKey);



module.exports = router;
