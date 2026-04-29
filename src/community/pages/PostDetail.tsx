import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getComments, createComment, getPost } from "../communityapi";
import CommentItem from "../components/commentItem";
import { getAnonId } from "../getAnonId";
import type { Comment, Post } from "../../types/communities";
import LoaderSpinner from "../../components/ui/LoadingSpinner";
import { FiArrowLeft } from "react-icons/fi";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);


const loadData = useCallback(async () => {
  setLoading(true);

  try {
    const [postRes, commentRes] = await Promise.all([
      getPost(Number(id)),
      getComments(Number(id)),
    ]);

    setPost(postRes);
    setComments(commentRes);
  } catch (err) {
    console.error("Failed to load data", err);
  } finally {
    setLoading(false);
  }
}, [id]);

useEffect(() => {
  loadData();
}, [loadData]);

 

const handleComment = async () => {
  if (!newComment.trim() || posting) return;

  setPosting(true);

  try {
    const newC = await createComment(Number(id), {
      content: newComment,
      anonymous_id: getAnonId(),
    });

    setComments((prev) => [newC, ...prev]);
    setNewComment("");
  } catch (err) {
    console.error(err);
  } finally {
    setPosting(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4 pb-24">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => nav(-1)}>
          <FiArrowLeft />
        </button>
        <span className="text-sm text-gray-400">Post #{id}</span>
      </div>

      {/*  POST CARD */}
      {post && (
        <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
          <div className="text-sm text-gray-400">
            {post.user_name} • {post.time_ago}
          </div>
          <p className="mt-2">{post.content}</p>
        </div>
      )}

      {/* COMMENTS */}
      <div className="space-y-3">
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            postId={Number(id)}
          />
        ))}
      </div>

      {/* INPUT */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 p-3 flex gap-2">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your answer..."
          className="flex-1 bg-[#1a1a1a] p-2 rounded"
        />

       <button
  onClick={handleComment}
  disabled={!newComment.trim() || posting}
  className="bg-main px-4 rounded disabled:opacity-50"
>
  {posting ? "Posting..." : "Post"}
</button>
      </div>
    </div>
  );
}