const express = require('express');
const router = express.Router();
const { getAllPasswords, getRandom } = require('../controllers/passwordController');

router.get('/getAllPasswords', getAllPasswords);
router.get('/getRandom', getRandom);

module.exports = router;

