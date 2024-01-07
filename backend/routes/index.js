const express = require('express');
const router = express.Router();

const Post = require('../models/Posts');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const posts = await Post.find({premium: false});
    return res.json({status: 'success', posts});
  } catch (error) {
    console.log(error);
    return res.status(501).json({status: 'failed', error: 'INTERNAL SERVER ERROR'});
  }
});

router.get('/post/:post_id', async function (req, res, next) {
  try {
    const post = await Post.findOne({_id: req.params.post_id, premium: false});
    return res.json({status: 'success', post});
  } catch (error) {
    return res.status(501).json({status: 'failed', message: 'INTERNAL SERVER ERROR'});
  }
});

module.exports = router;
