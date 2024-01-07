const Users = require('../models/Users');
const handleImageUpload = require('../controller/handleImageUpload');

// Controller for Update Profile Route Using this Function user and Admin can update profiles
const updateProfile = async (req, res, next) => {
  const {email, name, bio, twitter, linkedin} = req.body;

  try {
    const user = await Users.findOneAndUpdate({_id: req.params.user_id}, req.body);

    if (!user) {
      res.status(404).json({error: 'User not found'});
      return;
    }

    const previousAvatarPath = user.profile.avatar || '';
    const previousCoverImagePath = user.profile.coverImage || '';

    if (name || email || bio || twitter || linkedin) {
      user.profile.name = name || user.profile.name;
      user.email = email || user.email;
      user.profile.bio = bio || user.profile.bio;
      user.profile.socialLinks.twitter = twitter || user.profile.socialLinks.twitter;
      user.profile.socialLinks.linkedin = linkedin || user.profile.socialLinks.linkedin;
    }

    // Update avatar
    if (req.files && req.files['avatar']) {
      await handleImageUpload(req, user, 'avatar', previousAvatarPath);
    }

    // Update coverImage
    if (req.files && req.files['coverImage']) {
      await handleImageUpload(req, user, 'coverImage', previousCoverImagePath);
    }
    await user.save();
    console.log(user.profile.name);
    // const updatedUser = await user.save();
    return res.json({status: 'success', user_id: req.params.id});
    // res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = updateProfile;
