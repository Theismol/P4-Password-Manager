const {createOrganization, addUserToOrganization, getUserInOrganization} = require('../controllers/organization');
const {authenticateToken} = require('../middlewares/Auth/jwtMiddleware');

const express = require('express');
const router = express.Router();

router.post('/createOrganization',authenticateToken ,createOrganization);
router.post('/addUserToOrganization',authenticateToken ,addUserToOrganization);
router.get('/getUserInOrganization' , authenticateToken, getUserInOrganization);


module.exports = router;