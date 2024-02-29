// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

const { getUser, createUser, deleteUser} = require('../controllers/userController.js');

router.get('/', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);

// Export the router instance
module.exports = router;
