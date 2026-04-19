import React, { useState } from 'react';

const NewPostForm = ({ onCreatePost }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePost({ name, content });
    setName('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <h3>Create a New Post</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', minHeight: '80px' }}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
};

export default NewPostForm;
