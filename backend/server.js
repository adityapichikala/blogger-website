// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/Post');
const authRoutes = require('./routes/authRoutes'); // ✅ Include auth routes

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myblogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
app.use('/api', authRoutes);

// Posts routes
app.get('/posts', async (req, res) => {
  const search = req.query.search || '';
  const posts = await Post.find({
    $or: [
      { title: new RegExp(search, 'i') },
      { content: new RegExp(search, 'i') },
      { author: new RegExp(search, 'i') },
    ]
  });
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author, date: new Date().toLocaleDateString() });
  await newPost.save();
  res.json({ message: 'Post saved successfully' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
