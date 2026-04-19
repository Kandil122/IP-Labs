const SERVER_URL = "http://localhost:3000";

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/posts`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error in getAllPosts:", err);
    throw err;
  }

};

export const getPostDetails = async (postId) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/${postId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post details for ID ${postId}: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`Error in getPostDetails for ID ${postId}:`, err);
    throw err;
  }
};

export const createNewPost = async (newPostData) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPostData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create new post: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error in createNewPost:", err);
    throw err;
  }
};

export const createNewComment = async (postId, newCommentData) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommentData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create comment for post ${postId}: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`Error in createNewComment for post ${postId}:`, err);
    throw err;
  }
};
