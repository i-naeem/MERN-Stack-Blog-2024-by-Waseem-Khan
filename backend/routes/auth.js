var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const Passport = require('passport');
const User = require('../models/Users');
const jwtPrivateKey = process.env.JWT_SECRET;
const localStrategy = require('passport-local');

Passport.use(new localStrategy(User.authenticate()));

// Route 1: Auth Route for Registering user "api/auth/register"
router.post('/register', async (req, res) => {
  const {username, email, password} = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({status: 'failed', error: 'Please provide all required fields.'});
    }

    const existingUser = await User.findOne({$or: [{username}, {email}]});
    if (existingUser) {
      return res
        .status(400)
        .json({status: 'failed', error: 'Username or email is already in use.'});
    }

    const user = new User({username, email});
    const authtoken = jwt.sign(
      {
        role: user.role,
        user_id: user._id,
        isVerified: user.isVarified,
        username: user.username,
      },
      jwtPrivateKey,
      {expiresIn: '7d'}
    );
    console.log(authtoken);
    // This is code is for Decoding the AuthToken and Extract Information from AuthToken
    // var decoded = jwt.verify(authtoken, jwtPrivateKey);
    // console.log(decoded);

    // Use Passport's register method for password hashing
    User.register(user, password, async (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({status: 'failed', error: 'Internal Server Error'});
      }

      // Authenticate the user after registration
      Passport.authenticate('local')(req, res, () => {
        res.json({status: 'success', authToken: authtoken});
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({status: 'failed', error: 'Internal Server Error'});
  }
});

router.post('/login', async function (req, res, next) {
  const {username, password} = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({status: 'failed', error: 'Please provide all required fields.'});
    }
    Passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({status: 'failed', error: 'Invalid username or password'});
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        const authtoken = jwt.sign(
          {
            username: user.username,
            user_id: user._id,
            isVarified: user.isVarified,
            role: user.role,
          },
          jwtPrivateKey,
          {expiresIn: '7d'}
        );
        // This is code is for Decoding the AuthToken and Extract Information from AuthToken
        // var decoded = jwt.verify(authtoken, jwtPrivateKey);

        return res.json({
          status: 'success',
          authToken: authtoken,
        });
      });
    })(req, res, next);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({status: 'failed', error: 'Internal Server Error'});
  }
});

router.post('/logout', async function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({status: 'success'});
  });
});

module.exports = router;
