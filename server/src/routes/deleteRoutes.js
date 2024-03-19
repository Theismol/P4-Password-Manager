const {deleteAllUsers} = require('../controllers/deleteFromDb');

const express = require('express');
const router = express.Router();

router.delete('/deleteAllUsers', deleteAllUsers);

module.exports = router;