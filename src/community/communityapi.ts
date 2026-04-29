import api from "../api/api";

// GET POSTS (returns array directly for UI)
export const getPosts = async (page = 1) => {
  const res = await api.get(`/community/posts/?page=${page}`);
  return res.data.results; // 🔥 FIX: prevents .map error
};

// GET SINGLE POST
export const getPost = async (postId: number) => {
  const res = await api.get(`/community/posts/${postId}/`);
  return res.data;
};

// CREATE POST
export const createPost = async (data: {
  content: string;
  anonymous_id: string;
  user_name?: string;
}) => {
  const res = await api.post(`/community/posts/`, data);
  return res.data;
};

// GET COMMENTS (normalize to array)
export const getComments = async (postId: number, page = 1) => {
  const res = await api.get(
    `/community/posts/${postId}/comments/?page=${page}`
  );

  // handle both paginated and non-paginated backend safely
  return res.data.results ?? res.data;
};

// CREATE COMMENT / REPLY
export const createComment = async (
  postId: number,
  data: {
    content: string;
    anonymous_id: string;
    parent_id?: number;
  }
) => {
  const res = await api.post(
    `/community/posts/${postId}/comment/`,
    data
  );
  return res.data;
};

export const reactToComment = async (
  commentId: number,
  data: {
    reaction_type: "like" | "dislike";
    anonymous_id: string;
  }
) => {
  const res = await api.post(
    `/community/comments/${commentId}/react/`,
    data
  );
  return res.data;
};