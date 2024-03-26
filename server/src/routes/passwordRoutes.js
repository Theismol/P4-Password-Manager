const express = require('express');
const router = express.Router();
const { getAllPasswords, getRandom, addPasswordToUser, deletePassword } = require('../controllers/passwordController');
const authenticateToken = require('../middlewares/Auth/jwtMiddleware');

router.get('/getAllPasswords', getAllPasswords);
router.get('/getRandom', getRandom);
router.post('/addPasswordToUser',authenticateToken, addPasswordToUser);
router.delete('/deletePassword/:passwordId',authenticateToken, deletePassword);

module.exports = router;

