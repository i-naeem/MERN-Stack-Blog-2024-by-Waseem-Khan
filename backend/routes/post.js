var express = require('express');
var router = express.Router();

const PostModel = require('../models/Posts');

const upload = require('../middleware/uploadFile');
const hasRole = require('../middleware/hasRole');

const slugPattern = require('../utils/createSlugPattern');

/**
 * GET ALL POSTS (PREMIUM|NORMAL)
 * GET SINGLE POST
 * CREATE POST
 * UPDATE POST
 * DELETE POST
 */

router.get('/', hasRole(['subscriber', 'admin']), async function (req, res, next) {
  try {
    let filter = !!req.query.premium ? {premium: true} : {};
    const posts = await PostModel.find(filter);
    res.json({status: 'success', posts});
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 'failed', error: 'Internal Server Error'});
  }
});

router.get('/:post_id', hasRole(['subscriber', 'admin']), async (req, res) => {
  try {
    const post = await PostModel.findOne({_id: req.params.post_id});

    if (!post) {
      return res.status(404).json({status: 'failed', error: 'No Post was found.'});
    }
    res.json({status: 'success', post});
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 'failed', error: 'Internal Server Error'});
  }
});

router.post(
  '/create',
  hasRole(['admin']),
  upload.single('featureImage'),
  async (req, res, next) => {
    try {
      const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        premium: req.body.premium,
        tags: req.body.tags,
        slug: slugPattern(req.body.slug),
      });
      const previousFeaturedImage = post.featureImage || '';
      if (previousFeaturedImage) {
        const pfiPath = path.join(__dirname, `./uploads/${previousFeatureImage}`);
        await fs.promises.access(pfiPath);
        await fs.promises.unlink(pfiPath);
        console.log(`Previous Image Deleted: ${pfiPath}`);
        post.featureImage = '';
      }

      if (req.file) {
        post.featureImage = req.file.path;
        console.log(`New Image Path: ${post.featureImage}`);
      }
      await post.save();
      return res.json({
        status: 'success',
        post: post,
      });
    } catch (error) {
      /**
       * console.error('Caught error:', error);

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
       */
      console.log(error);
      return res.status(501).json({
        status: 'failed',
        error: 'Internal Server Error',
      });
    }
  }
);

router.put('/:post_id', hasRole(['admin']), async (req, res, next) => {
  try {
    const post_data = {
      title: req.body.title,
      content: req.body.content,
      premium: req.body.premium,
      tags: req.body.tags,
    };

    await PostModel.findOneAndUpdate({_id: req.params.post_id}, post_data);

    return res.json({
      status: 'success',
      post_id: req.params.post_id,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      status: 'failed',
      error: 'Internal Server Error',
    });
  }
});

router.delete('/:post_id', hasRole(['admin']), async (req, res, next) => {
  try {
    const deletePost = await PostModel.findOneAndDelete({_id: req.params.post_id});

    if (!deletePost) {
      return res.status(404).json({status: 'failed', error: 'Post not found'});
    }

    res.json({status: 'success', post_id: req.params.post_id});
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 'failed', error: 'Internal Server Error'});
  }
});

module.exports = router;
