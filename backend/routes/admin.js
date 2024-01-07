var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const Users = require('../models/Users');
const PostModel = require('../models/Posts');
const slugPattern = require('../utils/createSlugPattern');
const updateProfile = require('../controller/updateProfile');

const hasRole = require('../middleware/hasRole');
const upload = require('../middleware/uploadFile');

router.get('/dashboard', hasRole(['admin']), async function (req, res) {
  let success = false;
  try {
    const userId = req.user.userId;
    const user = await Users.findById(userId).select('-password, -role');
    success = true;
    res.json({success, dashboard: 'Redirected to the dashboard', user});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.post(
  '/addpost',
  upload.single('featureImage'), // Assuming multer is used for file upload
  async function (req, res, next) {
    const {title, content, slug, premium, tags} = req.body;

    try {
      const post = new PostModel({
        title,
        content,
        slug: slugPattern(slug),
        premium,
        tags,
      });

      const previousFeatureImage = post.featureImage || '';

      if (previousFeatureImage) {
        const previousImagePathFull = path.join(__dirname, `./uploads/${previousFeatureImage}`);

        // Check if the previous image file exists before trying to delete
        await fs.promises.access(previousImagePathFull);

        // Unlink the previous image file
        await fs.promises.unlink(previousImagePathFull);
        console.log(`Previous image deleted: ${previousImagePathFull}`);

        // Update MongoDB record to remove the file path
        post.featureImage = ''; // Set the featureImage field to an empty string
      }

      if (req.file) {
        post.featureImage = req.file.path;
        console.log(`New image path: ${post.featureImage}`);
      }

      await post.save();
      res.json(post);
    } catch (error) {
      console.error('Caught error:', error);

      if (
        error.name === 'MongoServerError' &&
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.slug
      ) {
        // Duplicate key error for the 'slug' field
        console.error('Duplicate key error for slug:', error.keyValue.slug);
        res.status(400).json({error: 'Slug must be unique.'});
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({error: 'Internal Server Error'});
      }
    }
  }
);
// Route to Delete a blog post by slug
router.put('/post/:slug', async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const {title, content} = req.body;
  try {
    const post = await PostModel.findOneAndUpdate({slug});

    if (!post) {
      res.status(404).json({error: 'Post not found'});
      return;
    }
    // Update the post properties only if they are present in the request body
    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }
    // Save the updated post and get the updated document
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.delete('/post/:slug', async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    const deletePost = await PostModel.findOneAndDelete({slug});

    if (!deletePost) {
      res.status(404).json({error: 'Post not found'});
      return;
    }
    res.json(deletePost);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

/* GET home page. */
router.get('/allpremiumposts', async function (req, res, next) {
  try {
    const post = await PostModel.find();
    if (!post) {
      res.status(404).json({error: 'Post not found'});
      return;
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.get('/subscribers', async function (req, res, next) {
  try {
    const user = await Users.find();
    if (!user) {
      res.status(404).json({error: 'Post not found'});
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.put(
  '/subscriber/:Username',
  upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'coverImage', maxCount: 1},
  ]),
  updateProfile
);

// router.put('/subscriber/:Username', checkAdmin, async function (req, res, next) {
//   const username = req.params.Username;
//   const {email, password} = req.body;
//   try {
//     const user = await Users.findByUsername(username);

//     if (!user) {
//       res.status(404).json({error: 'User not found'});
//       return;
//     }
//     // Update the post properties only if they are present in the request body
//     if (email) {
//       user.email = email;
//     }

//     if (password) {
//       user.password = password;
//     }
//     // Save the updated post and get the updated document
//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// });

router.delete('/subscriber/:Username', async function (req, res, next) {
  const username = req.params.Username;
  try {
    const user = await Users.findByUsername(username);
    const userId = user._id;
    const deleteUser = await Users.findByIdAndDelete(userId);
    console.log(userId);
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
