// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

// Add body parser middleware
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Get all comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Add comment by post id
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id
  const commentId = randomBytes(4).toString('hex');
  // Get comment content
  const { content } = req.body;
  // Get comments by post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add new comment
  comments.push({ id: commentId, content });
  // Update comments by post id
  commentsByPostId[req.params.id] = comments;
  // Send new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});