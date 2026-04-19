import React from 'react';
import CommentList from './CommentList';

const SinglePostView = ({ post, comments }) => {
  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div>
      <h2>{post.name}</h2>
      <p>{post.content}</p>
      <hr />
      <CommentList comments={comments} />
    </div>
  );
};

export default SinglePostView;
