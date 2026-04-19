import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable JSON and CORS
app.use(express.json());
app.use(cors());

// --- Database (Storage) ---
// Using simple arrays as requested in the task
let posts = [
  { id: 1, name: "Gordan Ramsy", content: "what are you, stupid sandwich" },
  { id: 2, name: "mahmoud", content: "React is good" }
];

let comments = [
  { id: 1, postId: 1, comment: "This is a unbelivable post!" },
  { id: 2, postId: 1, comment: "Indeed it is." }
];

// --- Endpoints ---

// 1. GET /posts: Retrieve all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 2. GET /posts/:id: Get a single post and its comments
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const postComments = comments.filter(c => c.postId === postId);
  res.json({ post, comments: postComments });
});

// 3. POST /posts: Create a new post
app.post('/posts', (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: "Name and content are required" });
  }

  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    name,
    content
  };

  posts.push(newPost);
  console.log(`Adding this new post: ${JSON.stringify(newPost)}`);
  res.status(201).json(newPost);
});

// 4. POST /posts/:id/comments: Add a comment to a specific post
app.post('/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  const newComment = {
    id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
    postId,
    comment
  };

  comments.push(newComment);
  console.log(`Adding this new comment for post ${postId}: ${JSON.stringify(newComment)}`);
  res.status(201).json(newComment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
