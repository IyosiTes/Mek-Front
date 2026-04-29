import { useState } from "react";
import type { Comment } from "../../types/communities";
import { reactToComment, createComment } from "../communityapi";
import { getAnonId } from "../getAnonId";
import { ThumbsUp, ThumbsDown, Reply } from "lucide-react";

export default function CommentItem({
  comment,
  postId,
  depth = 0,
}: {
  comment: Comment;
  postId: number;
  depth?: number;
}) {
  const [likes, setLikes] = useState(comment.like_count);
  const [dislikes, setDislikes] = useState(comment.dislike_count);
  const [reply, setReply] = useState(""); 
  const [replying, setReplying] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null);

 
  const handleReaction = async (type: "like" | "dislike") => {
    if (userReaction === type) return;

    if (type === "like") {
      setLikes((l) => l + 1);
      if (userReaction === "dislike") {
        setDislikes((d) => Math.max(0, d - 1)); 
      }
    } else {
      setDislikes((d) => d + 1);
      if (userReaction === "like") {
        setLikes((l) => Math.max(0, l - 1));
      }
    }

    setUserReaction(type);

    try {
      await reactToComment(comment.id, {
        reaction_type: type,
        anonymous_id: getAnonId(),
      });
    } catch (err) {
      console.error("Reaction failed", err);
    }
  };

 
  const handleReply = async () => {
    if (!reply.trim() || replying) return;

    setReplying(true);

    try {
      const newReply = await createComment(postId, {
        content: reply,
        anonymous_id: getAnonId(),
        parent_id: comment.id,
      });

      setReplies((prev) => [...prev, newReply]);
      setReply("");
      setShowReply(false);
      setShowReplies(true);
    } catch (err) {
      console.error("Reply failed", err);
    } finally {
      setReplying(false);
    }
  };

  return (
    <div
      className="bg-[#1a1a1a] p-3 rounded-xl border-l border-gray-700"
      style={{ marginLeft: depth * 14 }}
    >
      {/* HEADER */}
      <div className="text-sm text-gray-400 flex items-center gap-2">
        {comment.username}

        {comment.is_author && (
          <span className="bg-sky text-xs text-white px-0.5 rounded">
            Author
          </span>
        )}

        • {comment.time_ago}
      </div>

      {/* CONTENT */}
      <p className="mt-1 text-white">{comment.content}</p>

      {/* ACTIONS */}
      <div className="flex gap-4 text-sm text-gray-400 mt-2">
        <button onClick={() => handleReaction("like")}>
          <ThumbsUp size={16} /> {likes}
        </button>

        <button onClick={() => handleReaction("dislike")}>
          <ThumbsDown size={16} /> {dislikes}
        </button>

        <button onClick={() => setShowReply((s) => !s)}>
          <Reply size={16} /> Reply
        </button>
      </div>

      {/* REPLY INPUT */}
      {showReply && (
        <div className="mt-2 flex gap-2">
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="flex-1 bg-[#222] p-1 rounded"
            placeholder="Reply..."
          />
          <button
            onClick={handleReply}
            disabled={replying}
            className="text-sm"
          >
            {replying ? "Posting..." : "Post"}
          </button>
        </div>
      )}

      {/* SHOW REPLIES */}
      {replies.length > 0 && !showReplies && (
        <button
          onClick={() => setShowReplies(true)}
          className="text-blue-400 text-sm mt-2"
        >
          Show Replies ({replies.length})
        </button>
      )}

      {/* REPLIES */}
      {showReplies && (
        <div className="mt-2 space-y-2">
          {replies.map((r) => (
            <CommentItem
              key={r.id}
              comment={r}
              postId={postId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}