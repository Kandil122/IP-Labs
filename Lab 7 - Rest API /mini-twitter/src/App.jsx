import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import NewPostForm from './components/NewPostForm';
import SinglePostView from './components/SinglePostView';
import NewCommentForm from './components/NewCommentForm';
import { getAllPosts, getPostDetails, createNewPost, createNewComment } from './api/api';

const App = () => {
  const [view, setView] = useState('LIST_VIEW'); // 'LIST_VIEW' or 'DETAIL_VIEW'
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);

  // Load initial posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };
    loadPosts();
  }, []);

  // Handler to select a post and switch to detail view
  const handleSelectPost = async (postId) => {
    try {
      setSelectedPostId(postId);
      const { post, comments } = await getPostDetails(postId);
      setSelectedPost(post);
      setComments(comments);
      setView('DETAIL_VIEW');
    } catch (err) {
      console.error("Failed to load post details", err);
    }
  };

  // Handler to go back to the list view
  const handleBackToList = () => {
    setView('LIST_VIEW');
    setSelectedPostId(null);
    setSelectedPost(null);
    setComments([]);
  };

  // Handler to create a new post
  const handleCreatePost = async (newPostData) => {
    try {
      await createNewPost(newPostData);
      // After creating, re-fetch all posts to update the list
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  // Handler to create a new comment
  const handleCreateComment = async (newCommentData) => {
    if (!selectedPostId) return;
    try {
      await createNewComment(selectedPostId, newCommentData);
      // After creating, re-fetch post details to update comments
      const { comments } = await getPostDetails(selectedPostId);
      setComments(comments);
    } catch (err) {
      console.error("Failed to create comment", err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Mini-Twitter</h1>
      {view === 'LIST_VIEW' ? (
        <>
          <NewPostForm onCreatePost={handleCreatePost} />
          <PostList posts={posts} onSelectPost={handleSelectPost} />
        </>
      ) : (
        <>
          <button onClick={handleBackToList} style={{ marginBottom: '20px' }}>
            &larr; Back to Posts
          </button>
          <SinglePostView post={selectedPost} comments={comments} />
          <NewCommentForm onCreateComment={handleCreateComment} />
        </>
      )}
    </div>
  );
};

export default App;