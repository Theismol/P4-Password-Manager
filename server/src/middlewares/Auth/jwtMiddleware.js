const { verifyToken, verifyMFAToken } = require('../../utils/JWT/jwtUtils.js');
require('dotenv').config();

const csrftoken = process.env.CSRF_TOKEN;
const authenticateMFAToken = (req, res, next) => {
    const token = req.cookies.mfatoken;
    try {
        const decoded = verifyMFAToken(token);
        req.user = decoded;
        //console.log("decoded: ", decoded)
        

        next(); // Call next middleware or route handler
    } catch (error) {
        console.log(error);

        //console.log("fuck");
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' }); // Unauthorized
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' }); // Unauthorized
        } else {
            return res.status(500).json({ message: 'Internal server error' }); // Internal server error
        }
    }

}

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    const receivedCsrftoken = req.body.csrftoken
    console.log(token);
    
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    console.log("csrftoken: ", receivedCsrftoken)
    console.log("csrftoken: ", csrftoken);
    console.log("metode " + req.method)
    if ((token == null || receivedCsrftoken != csrftoken )&& req.method != "GET") {
        console.log("token is null")
        return res.sendStatus(401).send();
    }else if(token == null){
        console.log("token is null2")
        return res.sendStatus(401).send();
    }

    
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        //console.log("decoded: ", decoded)
        

        next(); // Call next middleware or route handler
    } catch (error) {

        //console.log("fuck");
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' }); // Unauthorized
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' }); // Unauthorized
        } else {
            return res.status(500).json({ message: 'Internal server error' }); // Internal server error
        }
    }
}


module.exports = {authenticateToken, authenticateMFAToken};
