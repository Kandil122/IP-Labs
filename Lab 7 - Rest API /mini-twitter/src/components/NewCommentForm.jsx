import React, { useState } from 'react';

const NewCommentForm = ({ onCreateComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateComment({ comment });
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h4>Add a Comment</h4>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', minHeight: '60px' }}
        />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default NewCommentForm;
