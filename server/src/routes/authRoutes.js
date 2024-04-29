
const express = require('express');
const router = express.Router();
const { login, tokenRefresh, exntionCheckLogin, logout,verifyTOTPFirstTime, verifyTOTP, checkMFA, getCSRF} = require('../controllers/authController');
const authenticateToken = require('../middlewares/Auth/jwtMiddleware');



router.post('/login', login);
router.post('/tokenRefresh', tokenRefresh);
router.post('/logout', logout);
router.post('/verifyTOTP', authenticateToken, verifyTOTP);
router.post('/verifyTOTPFirstTime',authenticateToken, verifyTOTPFirstTime);
router.get('/checkMFA',authenticateToken,checkMFA);
router.get('/getCSRF', authenticateToken, getCSRF );
router.get('/exntionCheckLogin', authenticateToken, exntionCheckLogin);



module.exports = router;
