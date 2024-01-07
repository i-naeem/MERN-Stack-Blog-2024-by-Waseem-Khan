const jwt = require('jsonwebtoken');
const jwtPrivateKey = process.env.JWT_SECRET;

const hasRole =
  (roles = ['subscriber']) =>
  (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({status: 'failed', error: 'Unauthorized - Missing token'});
      }

      jwt.verify(token, jwtPrivateKey, (err, user) => {
        if (err) {
          return res.status(403).json({status: 'failed', error: 'Forbidden - Invalid token'});
        }

        if (roles.findIndex((role) => role == user.role) != -1) {
          req.role = user.role;
          req.user = user;
          next();
        } else {
          return res.status(401).json({status: 'forbidden', error: 'You are not authorized.'});
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({status: 'failed', error: 'Internal Server ERROR!'});
    }
  };

module.exports = hasRole;
