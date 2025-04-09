const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get All Posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

// Add a Post
router.post('/posts', async (req, res) => {
  const { title, content, author, date } = req.body;
  try {
    const post = new Post({ title, content, author, date });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

module.exports = router;
