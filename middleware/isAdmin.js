const jwt = require('jsonwebtoken');
// Use the same secretKey as you used in your verifyToken middleware
const secretKey = 'verySecreteValue';

const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the Bearer token format

  try {
    // Directly use jwt.verify with the correct secret key
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded); // Log the decoded token to the console
    
    if (decoded.role === 'Admin') {
      req.user = decoded; // Optional: Attach the decoded user data to the request object
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Requires administrator privileges.' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  isAdmin
};
