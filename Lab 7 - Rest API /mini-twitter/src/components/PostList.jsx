import React from 'react';

const PostList = ({ posts, onSelectPost }) => {
  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id} onClick={() => onSelectPost(post.id)} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', cursor: 'pointer' }}>
          <h3>{post.name}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
