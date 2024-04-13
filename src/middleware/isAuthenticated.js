const jwt = require('jsonwebtoken');
const secretKey = 'verySecreteValue'; 

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token from headers

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Store decoded user information in request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken
  