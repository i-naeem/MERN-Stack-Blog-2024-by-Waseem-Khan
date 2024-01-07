const jwt = require('jsonwebtoken');
const jwtPrivateKey = process.env.JWT_SECRET;

const authenticateTokenSubscriber = (req, res, next) => {
  const success = false;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({success, error: 'Unauthorized - Missing token'});
  }

  jwt.verify(token, jwtPrivateKey, (err, user) => {
    if (err) {
      return res.status(403).json({success, error: 'Forbidden - Invalid token'});
    }

    // Optionally, you can perform additional checks here

    // Check if the user has the required role (e.g., 'admin') to access the dashboard
    if (user.role !== 'subscriber') {
      return res.status(403).json({success, error: 'Forbidden - Insufficient privileges'});
    }
    // If all checks pass, you can proceed to the next middleware or route
    req.user = user;
    next();
  });
};

module.exports = authenticateTokenSubscriber;
