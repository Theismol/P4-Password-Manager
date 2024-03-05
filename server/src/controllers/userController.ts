import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/userModel';

const salt = 10;

const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error during fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default getAll;
