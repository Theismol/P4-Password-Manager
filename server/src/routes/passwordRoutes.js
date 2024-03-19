const express = require('express');
const router = express.Router();
const { getAllPasswords, getRandom, addPasswordToUser } = require('../controllers/passwordController');
const authenticateToken = require('../middlewares/Auth/jwtMiddleware');

router.get('/getAllPasswords', getAllPasswords);
router.get('/getRandom', getRandom);
router.post('/addPasswordToUser',authenticateToken, addPasswordToUser);

module.exports = router;

