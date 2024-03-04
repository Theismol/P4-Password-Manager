const {verifyToken} = require('../../utils/JWT/jwtUtils.js');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Attach the decoded token payload to the request object
        next(); // Call next middleware or route handler
    } catch (error) {
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' }); // Unauthorized
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' }); // Unauthorized
        } else {
            return res.status(500).json({ message: 'Internal server error' }); // Internal server error
        }
    }
}


module.exports = authenticateToken ;
