import type { Comment } from "../../types/communities";
import { timeAgo } from "../../utils/timeAgo";
import { useNavigate } from "react-router-dom";
import {
  FiThumbsUp,
  FiThumbsDown,
 FiCornerUpLeft,
} from "react-icons/fi";
import { useState } from "react";
import { voteComment } from "../communityapi";

type Props = {
  comment: Comment;

  onReply: (comment: Comment) => void;
};

export default function CommentCard({
  comment,
  
  onReply,
}: Props) {

const nav = useNavigate();

const token = localStorage.getItem("access");
const isLoggedIn = !!token;

const [userVote, setUserVote] = useState(comment.user_vote);

const [voteScore, setVoteScore] = useState(comment.vote_score);

const [upvotes, setUpvotes] = useState(comment.upvote_count);

const [downvotes, setDownvotes] = useState(comment.downvote_count);

const [loading, setLoading] = useState(false);


const handleVote = async (value: 1 | -1) => {
  if (!isLoggedIn) {
    nav("/login");
    return;
  }

  if (loading) return;

  const prevVote = userVote;
  const prevScore = voteScore;
  const prevUp = upvotes;
  const prevDown = downvotes;

  let nextVote: -1 | 0 | 1 = value;

  let score = voteScore;
  let up = upvotes;
  let down = downvotes;

  if (userVote === value) {
    nextVote = 0;

    score -= value;

    if (value === 1) up--;
    else down--;
  }

  else if (userVote === 0) {
    score += value;

    if (value === 1) up++;
    else down++;
  }

  else if (userVote === 1 && value === -1) {
    score -= 2;
    up--;
    down++;
  }

  else if (userVote === -1 && value === 1) {
    score += 2;
    down--;
    up++;
  }

  setUserVote(nextVote);
  setVoteScore(score);
  setUpvotes(up);
  setDownvotes(down);

  try {
    setLoading(true);

    await voteComment(
      comment.id,
      nextVote
    );

  } catch {

    setUserVote(prevVote);
    setVoteScore(prevScore);
    setUpvotes(prevUp);
    setDownvotes(prevDown);

  } finally {

    setLoading(false);

  }
};

  return (
    <div   id={`comment-${comment.id}`}
      className="
      border-b
      border-gray-900
      pb-4
      "
    >
      <div className="flex gap-3">

        <div
          className="
          w-9
          h-9
          rounded-full
          bg-[#181818]
          flex
          items-center
          justify-center
          "
        >
          {comment.author_name?.[0] || "ም"}
        </div>

        <div className="flex-1">

         <div className="flex items-center gap-2 flex-wrap">

  <span className="text-sm font-medium text-white">
    {comment.author_name || "ምእመን"}
  </span>

  {comment.is_post_creator && (
    <span
      className="
      rounded-full
      border
      border-red-500/30
      bg-black
      px-2
      py-0.5
      text-[10px]
      font-semibold
      uppercase
      tracking-wide
      text-sky
      "
    >
      Creator
    </span>
  )}

  <span className="text-xs text-zinc-500">
    •
  </span>

  <span className="text-xs text-zinc-500">
    {timeAgo(comment.created_at)}
  </span>

</div>
         {comment.reply_preview && (
  <button
    onClick={() => {
      const el = document.getElementById(
        `comment-${comment.parent}`
      );

      el?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      el?.classList.add(
        "ring-2",
        "ring-red-500"
      );

      setTimeout(() => {
        el?.classList.remove(
          "ring-2",
          "ring-red-500"
        );
      }, 1500);
    }}
    className="
      mt-3
      mb-3
      w-full
      text-left

      rounded-xl

      border
      border-zinc-800

      bg-zinc-900/70

      hover:bg-zinc-800

      transition

      overflow-hidden
    "
  >
    <div
      className="
       border-l-4
      border-red-500
      px-3
      py-2
      "
    >
      <div
        className="
        text-xs
        font-semibold
        text-sky
        "
      >
        ↪ Reply
      </div>

      <div
        className="
        mt-1
        text-sm
        text-zinc-400
        truncate
        "
      >
        {comment.reply_preview}
      </div>
    </div>
  </button>
)}
          <div
            className="
            mt-2
            text-sm
            leading-7
            "
          >
            {comment.content}
          </div>
       <div className="mt-3 flex items-center gap-5">

  <button
    onClick={() => handleVote(1)}
    disabled={loading}
    className="flex items-center gap-1 group"
  >
    <FiThumbsUp
      size={16}
      className={
        userVote === 1
          ? "text-red-500"
          : "text-zinc-500 group-hover:text-red-400"
      }
    />

    <span
      className={
        userVote === 1
          ? "text-red-400 text-xs"
          : "text-zinc-500 text-xs"
      }
    >
      {upvotes}
    </span>
  </button>

  <button
    onClick={() => handleVote(-1)}
    disabled={loading}
    className="flex items-center gap-1 group"
  >
    <FiThumbsDown
      size={16}
      className={
        userVote === -1
          ? "text-blue-500"
          : "text-zinc-500 group-hover:text-blue-400"
      }
    />

    <span
      className={
        userVote === -1
          ? "text-blue-400 text-xs"
          : "text-zinc-500 text-xs"
      }
    >
      {downvotes}
    </span>
  </button>

  <div className="h-4 w-px bg-zinc-800" />

  <span className="text-xs font-medium text-zinc-400">
    Score {voteScore}
  </span>

  <button
    onClick={() => onReply(comment)}
    className="ml-auto flex items-center gap-1 hover:text-red-400 transition-colors"
  >
    <FiCornerUpLeft size={15} />
    Reply
  </button>

</div>
        </div>
      </div>
    </div>
  );
}