// models/User.js
const mongoose = require('mongoose');
const checkAuth = require('passport-local-mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  avatar: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'subscriber'],
    default: 'subscriber',
  },
  profile: {
    name: {type: String, default: null},
    bio: {type: String, default: null},
    avatar: {type: String, default: null},
    coverImage: {type: String, default: null},
    socialLinks: {
      twitter: {type: String, default: null},
      linkedin: {type: String, default: null},
      // add other social links as needed
    },
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
});
userSchema.plugin(checkAuth);
const User = mongoose.model('User', userSchema);
module.exports = User;
