import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/JWT/jwtUtils';

// Extend the express Request interface to include a user property
declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401); // Unauthorized
        return;
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Attach the decoded token payload to the request object
        next(); // Call next middleware or route handler
    } catch (error) {
        const err = error as Error;
        if (err.name === 'JsonWebTokenError') {
            res.status(401).json({ message: 'Invalid token' }); // Unauthorized
        } else if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expired' }); // Unauthorized
        } else {
            res.status(500).json({ message: 'Internal server error' }); // Internal server error
        }
    }
};

export default authenticateToken;
