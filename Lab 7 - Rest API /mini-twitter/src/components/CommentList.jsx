import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div>
      <h4>Comments</h4>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} style={{ borderTop: '1px solid #eee', padding: '8px 0' }}>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
