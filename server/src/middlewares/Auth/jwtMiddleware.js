const { verifyToken } = require('../../utils/JWT/jwtUtils.js');
require('dotenv').config();

const csrftoken = process.env.CSRF_TOKEN;

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    const receivedCsrftoken = req.body.csrftoken
    console.log(token);
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    console.log("csrftoken: ", receivedCsrftoken)
    if (token == null || receivedCsrftoken != csrftoken) {
        console.log("token is null")
        return res.sendStatus(401).send();
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;

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


module.exports = authenticateToken;