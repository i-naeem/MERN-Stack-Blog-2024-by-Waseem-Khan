// const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const User = require('../models/Users');

const hasRole = require('../middleware/hasRole');
const upload = require('../middleware/uploadFile');
const updateProfile = require('../controller/updateProfile');

const verifyAuthorization = (req, res, next) => {
  if (req.params.user_id === req.user.user_id || req.role === 'admin') {
    next();
  } else {
    return res.json({status: 'failed', error: 'you are not authorized'});
  }
};

router.get('/', hasRole(['admin']), async (req, res, next) => {
  try {
    const users = await User.find({}, {password: 0});
    return res.json({status: 'success', users});
  } catch (error) {
    console.log(error);
    return res.status(501).json({status: 'failed', error: 'INTERNAL SERVER ERROR'});
  }
});

router.get('/:user_id', hasRole(['admin']), async (req, res, next) => {
  try {
    const users = await User.find({_id: req.params.user_id}, {password: 0});
    return res.json({status: 'success', users});
  } catch (error) {
    console.log(error);
    return res.status(501).json({status: 'failed', error: 'INTERNAL SERVER ERROR'});
  }
});

router.put(
  '/:user_id',
  hasRole(['subscriber', 'admin']),
  verifyAuthorization,
  upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'coverImage', maxCount: 1},
  ]),
  updateProfile
);

router.delete(
  '/:user_id',
  hasRole(['subscriber', 'admin']),
  verifyAuthorization,
  async (req, res, next) => {
    try {
      await User.findOneAndDelete({_id: req.params.user_id});
      return res.json({status: 'success', user_id: req.params.id});
    } catch (error) {
      console.log(error);
      return res.status(501).json({status: 'failed', error: 'INTERNAL SERVER ERROR'});
    }
  }
);

module.exports = router;
