const express = require('express');
const router = express.Router();
const { getAllPasswords, getRandom, addPasswordToUser, deletePassword, getPasswords, sendPassword, updatePassword } = require('../controllers/passwordController');
const {authenticateToken} = require('../middlewares/Auth/jwtMiddleware');
router.get('/getAllPasswords', getAllPasswords);
router.get('/getRandom', getRandom);
router.post('/addPasswordToUser',authenticateToken, addPasswordToUser);
router.delete('/deletePassword',authenticateToken, deletePassword);
router.get('/getPasswords', authenticateToken, getPasswords);
router.post('/sendPassword', authenticateToken, sendPassword);
router.put('/updatePassword', authenticateToken, updatePassword )

module.exports = router;

