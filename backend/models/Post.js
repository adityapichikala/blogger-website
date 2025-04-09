// backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: String,
});

module.exports = mongoose.model('Post', postSchema);
