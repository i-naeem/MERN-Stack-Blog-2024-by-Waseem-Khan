var express = require('express');
var router = express.Router();

const Users = require('../models/Users');

const upload = require('../middleware/uploadFile');
const authenticateTokenSubscriber = require('../middleware/verifyJWTSubscriber');

const updateProfile = require('../controller/updateProfile');

router.get('/dashboard', authenticateTokenSubscriber, async function (req, res, next) {
  let success = false;
  try {
    const userId = req.user.userId;
    const user = await Users.findById(userId).select('-password, -role');
    success = true;
    res.json({success, dashboard: 'Redirected to the Subscriber dashboard', user});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.put(
  '/profile',
  upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'coverImage', maxCount: 1},
  ]),
  updateProfile
);

// Route 2: Change Password Route "api/auth/change-password"
router.post('/changepassword', async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  const userId = req.user._id; // Assuming you have authenticated the user before reaching this route

  try {
    // Validate input
    if (!oldPassword || !newPassword) {
      return res.status(400).json({error: 'Please provide old and new passwords.'});
    }

    // Check if the old password is correct
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({error: 'User not found.'});
    }

    // Check if the old password matches the stored hash
    user.authenticate(oldPassword, async (err, authUser, passwordError) => {
      if (passwordError) {
        return res.status(401).json({error: 'Incorrect old password.'});
      }

      // Set the new password using setPassword method from passport-local-mongoose
      await user.setPassword(newPassword);

      // Save the user with the updated password hash
      await user.save();

      res.json({message: 'Password updated successfully.'});
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.delete('/account', async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.user.id);
    if (!deleteUser) {
      res.status(404).json({error: 'Post not found'});
      return;
    }
    res.json(deleteUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
