const {createOrganization, addUserToOrganization, getUserInOrganization, removeUserFromOrganization} = require('../controllers/organization');
const {authenticateToken} = require('../middlewares/Auth/jwtMiddleware');

const express = require('express');
const router = express.Router();

router.post('/createOrganization',authenticateToken ,createOrganization);
router.post('/addUserToOrganization',authenticateToken ,addUserToOrganization);
router.get('/getUserInOrganization' , authenticateToken, getUserInOrganization);
router.post('/removeUserFromOrganization',authenticateToken ,removeUserFromOrganization);


module.exports = router;