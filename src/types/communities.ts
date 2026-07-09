export type Profile = {
  display_name: string;
  avatar: string;
  bio: string;
  is_verified: boolean;
};

export type Post = {
  public_id: number;
  author_name: string;
  content: string;
  image_url: string | null;
  is_admin_post: boolean;
  is_pinned: boolean;
  is_author: boolean;
  comment_count: number;
  upvote_count: number;
  downvote_count: number;
  vote_score: number;
  user_vote: -1 | 0 | 1;
  created_at: string;
};

export type PostDetail = {
  public_id: number;
  author_name: string;
  content: string;
  image_url: string | null;
  is_admin_post: boolean;
  is_pinned: boolean;
  upvote_count: number;
  downvote_count: number;
  vote_score: number;
  comment_count: number;
  user_vote: -1 | 0 | 1;
  is_author: boolean;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: number;
  post: number;
  content: string;
  parent: number | null;
  is_post_creator: boolean;
  author_name: string;
  upvote_count: number;
  downvote_count: number;
  vote_score: number;
  user_vote: -1 | 0 | 1;
  is_author: boolean;
  reply_preview: string | null;
  created_at: string;
  is_deleted: boolean;
};

export type Notification = {
  id: number;
  notification_type:
    | "comment_on_post"
    | "reply_on_comment"
    | "admin_announcement";
  message: string;
  post_id: number | null;
  comment_id: number | null;
  is_read: boolean;
  created_at: string;
};