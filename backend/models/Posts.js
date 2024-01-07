const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {type: String, required: true},
    content: {type: String, required: true},
    metaDescription: {type: String},
    slug: {type: String, unique: true},
    premium: {type: Boolean, default: false},
    featureImage: {type: String, default: null},
    tags: [{type: String}],
    readingTime: {type: String},
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    // Add other fields as needed
  },
  {timestamps: true}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
