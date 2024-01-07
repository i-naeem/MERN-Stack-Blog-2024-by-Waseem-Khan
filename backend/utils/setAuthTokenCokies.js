const setAuthTokenCookie = (res, token) => {
  res.cookie('authToken', token, {
    httpOnly: true, // Cookie is only accessible through the HTTP(S) protocol
    secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS-only
    maxAge: 3600000, // Token expiration time in milliseconds (adjust as needed)
    sameSite: 'strict', // Restricts cookie to same-site requests
  });
};

module.exports = setAuthTokenCookie;
