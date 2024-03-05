import express, { Router } from 'express';
import getAll from '../controllers/userController';
import authenticateToken from '../middlewares/Auth/jwtMiddleware';

const router: Router = express.Router();

router.get('/getAll', authenticateToken, getAll);

export default router;
