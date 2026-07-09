import api from "../api/api";

/* -------------------- POSTS -------------------- */

export async function getPosts(page = 1) {
  const res = await api.get(`/community/posts/?page=${page}`);
  return res.data.results;
}

export async function getPost(publicId: number) {
  const res = await api.get(`/community/posts/${publicId}/`);
  return res.data;
}

export async function createPost(data: {
  content: string;
  image_url?: string;
}) {
  const res = await api.post(
    "/community/posts/create/",
    data
  );

  return res.data;
}

export async function updatePost(
  publicId: number,
  data: {
    content: string;
    image_url?: string;
  }
) {
  const res = await api.patch(
    `/community/posts/${publicId}/edit/`,
    data
  );

  return res.data;
}

export async function deletePost(
  publicId: number
) {
  const res = await api.post(
    `/community/posts/${publicId}/delete/`
  );

  return res.data;
}

/* -------------------- COMMENTS -------------------- */

export async function getComments(
  postId: number,
  page = 1
) {
  const res = await api.get(
    `/community/posts/${postId}/comments/?page=${page}`
  );

  return res.data.results;
}

export async function createComment(
  postId: number,
  data: {
    content: string;
    parent?: number | null;
  }
) {
  const res = await api.post(
    `/community/posts/${postId}/comments/create/`,
    data
  );

  return res.data;
}

export async function updateComment(
  commentId: number,
  content: string
) {
  const res = await api.patch(
    `/community/comments/${commentId}/edit/`,
    {
      content,
    }
  );

  return res.data;
}

export async function deleteComment(
  commentId: number
) {
  const res = await api.post(
    `/community/comments/${commentId}/delete/`
  );

  return res.data;
}

/* -------------------- VOTES -------------------- */

export async function votePost(
  postId: number,
  value: -1 | 0 | 1
) {
  const res = await api.post(
    "/community/vote/",
    {
      post_id: postId,
      value,
    }
  );

  return res.data;
}

export async function voteComment(
  commentId: number,
  value: -1 | 0 | 1
) {
  const res = await api.post(
    "/community/vote/",
    {
      comment_id: commentId,
      value,
    }
  );

  return res.data;
}

/* -------------------- NOTIFICATIONS -------------------- */

export async function getNotifications(
  page = 1
) {
  const res = await api.get(
    `/community/notifications/?page=${page}`
  );

  return res.data.results;
}

export async function getUnreadCount() {
  const res = await api.get(
    "/community/notifications/unread-count/"
  );

  return res.data.count;
}

export async function markNotificationRead(
  id: number
) {
  const res = await api.post(
    `/community/notifications/${id}/mark-read/`
  );

  return res.data;
}

export async function markAllNotificationsRead() {
  const res = await api.post(
    "/community/notifications/mark-all-read/"
  );

  return res.data;
}

export async function deleteNotification(
  id: number
) {
  await api.delete(
    `/community/notifications/${id}/delete/`
  );
}