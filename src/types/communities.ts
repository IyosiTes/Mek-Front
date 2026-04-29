
export type Comment = {
  id: number;
  content: string;
  username: string;
  time_ago: string;
  like_count: number;
  dislike_count: number;
  replies: Comment[];
  is_author: boolean;
};

export type Post = {
  public_id: number;
  content: string;
  user_name: string;
  created_at: string;
  time_ago: string;
  is_admin_post: boolean;

  comment_count: number;
};