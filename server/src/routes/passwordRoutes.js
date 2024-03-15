const express = require('express');
const router = express.Router();
const {getAllPasswords} = require('../controllers/passwordController');

router.get('/getAllPasswords', getAllPasswords);

module.exports = router;

