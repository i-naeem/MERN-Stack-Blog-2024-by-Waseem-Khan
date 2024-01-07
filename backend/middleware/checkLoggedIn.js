// Middleware to check if the user is logged in
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is logged in, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not logged in, set a flag in the request object for filtering posts
    req.filterPremium = true;
    return next();
  }
};

module.exports = checkLoggedIn;
