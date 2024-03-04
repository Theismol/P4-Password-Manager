const express = require('express');
const router = express.Router();
const getAll = require('../controllers/userController');
const authenticateToken = require('../middlewares/Auth/jwtMiddleware');


router.get('/getAll',authenticateToken, getAll);



module.exports = router;
