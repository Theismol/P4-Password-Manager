const {createOrganization, addUserToOrganization} = require('../controllers/organization');
const authenticateToken = require('../middlewares/Auth/jwtMiddleware');

const express = require('express');
const router = express.Router();

router.post('/createOrganization',authenticateToken ,createOrganization);
router.post('/addUserToOrganization',authenticateToken ,addUserToOrganization);


module.exports = router;