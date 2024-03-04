const jwt = require('jsonwebtoken');

// Middleware to generate a JWT token
const generateToken = async (req, res, next) => {
    try {
      const user = req.user.toObject(); // Convert Mongoose document to plain object
      const token = jwt.sign(user, process.env.JWT_SECRET);
      req.token = token;
      
      // Call the next middleware if available
      if (next) {
        next();
      } else {
        return res.status(200).json({ message: 'Token generated successfully' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  

// Middleware to authenticate a JWT token
const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is invalid or expired
      return res.status(401).json({ message: 'Invalid token' });
    }


    req.user = user;


    next();
  });
}

module.exports = {
  generateToken,
  authenticateToken,
};
