import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMessageCircle,
  FiThumbsUp,
  FiThumbsDown,
  FiShield,
   FiPaperclip,
} from "react-icons/fi";

import { timeAgo } from "../../utils/timeAgo";
import type { Post } from "../../types/communities";
import { votePost } from "../communityapi";

export default function PostCard({
  post,
}: {
  post: Post;
}) {
  const nav = useNavigate();

  const DISPLAY_NAME =
    post.author_name || "ምእመን";

  const DISPLAY_INITIAL =
    DISPLAY_NAME.charAt(0);

  const token = localStorage.getItem("access");
  const isLoggedIn = !!token;

  const [expanded, setExpanded] =
    useState(false);

  const [userVote, setUserVote] =
    useState(post.user_vote);

  const [voteScore, setVoteScore] =
    useState(post.vote_score);

  const [upvotes, setUpvotes] =
    useState(post.upvote_count);

  const [downvotes, setDownvotes] =
    useState(post.downvote_count);

  const [loading, setLoading] =
    useState(false);

  const content = post.content;

  const shouldTruncate =
    content.length > 300;

  const handleVote = async (
    value: 1 | -1
  ) => {
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

    else if (
      userVote === 1 &&
      value === -1
    ) {

      score -= 2;

      up--;
      down++;

    }

    else if (
      userVote === -1 &&
      value === 1
    ) {

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

      await votePost(
        post.public_id,
        nextVote
      );

    }

    catch {

      setUserVote(prevVote);
      setVoteScore(prevScore);
      setUpvotes(prevUp);
      setDownvotes(prevDown);

    }

    finally {

      setLoading(false);

    }
  };

  return (
    <article
   
      className={`
      relative
      overflow-hidden
      rounded-3xl
      border
      transition-all
      duration-300

      ${
        post.is_pinned
          ? `
      border-red-900/70
      bg-linear-to-r
      from-red-950/20
      via-[#111]
      to-[#111]
      shadow-[0_0_30px_rgba(127,29,29,.12)]
      `
          : `
      border-zinc-800
      bg-[#0f0f10]
      hover:border-zinc-700
      `
      }

      p-5
      mb-4
    `}
    >
      {post.is_admin_post && (
        <div
          className="
         absolute
      left-0
      top-0
      bottom-0
      w-1.5
      rounded-l-3xl

      shadow-[0_0_10px_rgba(220,38,38,.25)]

      bg-[repeating-linear-gradient(
        90deg,
        #dc2626_0px,
        #dc2626_2px,
        #09090b_2px,
        #09090b_4px
      )]
      "
        />
      )}

      <div className="flex">

        <div
          className="
        w-11
        h-11
        rounded-full
        bg-red-950
        flex
        items-center
        justify-center
        font-semibold
        text-red-300
        shrink-0
      "
        >
          {DISPLAY_INITIAL}
        </div>

        <div className="ml-3 flex-1">

          <div className="flex items-center gap-2 flex-wrap">

            <h3 className="font-semibold text-white">
              {DISPLAY_NAME}
            </h3>

            {post.is_admin_post && (
              <span
                className="
              inline-flex
              items-center
              gap-1

              rounded-full

              bg-red-500/10

              border
              border-red-500/30

              px-2.5
              py-1

              text-[11px]

              text-red-300
            "
              >
                <FiShield size={11} />
                ADMIN
              </span>
            )}

            {post.is_pinned && (
              <span
                className="
              inline-flex
              items-center
              gap-1

              rounded-full

              bg-red-500/10

              border
              border-red-500/30

              px-2.5
              py-1

              text-[11px]

              text-red-300
            "
              >
                < FiPaperclip size={10} />
                PINNED
              </span>
            )}

          </div>
           <p className="text-sm font-poppins text-gray-400">
              Confession #{post.public_id}
            </p>
          <div
            className="
          mt-1
          flex
          items-center
          gap-3
          text-xs
          text-zinc-500
        "
          >
            <span>
              {timeAgo(post.created_at)}
            </span>

           
          </div>

        </div>

      </div>

      <div
        className="
      mt-4
      text-[15px]
      leading-7
      text-zinc-200
      whitespace-pre-wrap
    "
      >
        {expanded
          ? content
          : content.slice(0, 300)}

        {shouldTruncate && (
          <>
            {!expanded && "... "}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="
            text-red-400
            hover:text-red-300
            ml-1
          "
            >
              {expanded
                ? "Show less"
                : "Read more"}
            </button>
          </>
        )}
      </div>

      <div
        className="
      mt-6
      pt-4

      border-t
      border-zinc-800

      flex
      items-center
      gap-5
    "
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVote(1);
          }}
          disabled={loading}
          className="
        flex
        items-center
        gap-2
        group
      "
        >
          <FiThumbsUp
            size={18}
            className={
              userVote === 1
                ? "text-red-500"
                : "text-zinc-500 group-hover:text-red-400"
            }
          />

          <span
            className={
              userVote === 1
                ? "text-red-400 text-sm"
                : "text-zinc-500 text-sm"
            }
          >
            {upvotes}
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVote(-1);
          }}
          disabled={loading}
          className="
        flex
        items-center
        gap-2
        group
      "
        >
          <FiThumbsDown
            size={18}
            className={
              userVote === -1
                ? "text-blue-500"
                : "text-zinc-500 group-hover:text-blue-400"
            }
          />

          <span
            className={
              userVote === -1
                ? "text-blue-400 text-sm"
                : "text-zinc-500 text-sm"
            }
          >
            {downvotes}
          </span>
        </button>

        <div
          className="
        h-5
        w-px
        bg-zinc-800
      "
        />

        <div
          className="
        text-sm
        font-semibold
        text-zinc-300
      "
        >
          Score {voteScore}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nav(`/community/post/${post.public_id}`);
          }}
          className="
        ml-auto
        flex
        items-center
        gap-2
        cursor-pointer
        text-zinc-400
        hover:text-white
      "
        >
          <FiMessageCircle size={18} />

          <span>
            {post.comment_count}
          </span>
        </button>
      </div>
    </article>
  );
}