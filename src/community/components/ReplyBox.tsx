import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiSend,
  FiX,
  FiCornerUpLeft,
} from "react-icons/fi";

import { createComment } from "../communityapi";

import type { Comment } from "../../types/communities";

type Props = {
  postId: number;
  replyingTo: Comment | null;
  setReplyingTo: React.Dispatch<
    React.SetStateAction<Comment | null>
  >;
  onCommentCreated: (
    comment: Comment
  ) => void;
};

export default function ReplyBox({
  postId,
  replyingTo,
  setReplyingTo,
  onCommentCreated,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("access");
  const isLoggedIn = !!token;

  const [newComment, setNewComment] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const handleComment = async () => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return;
    }

    if (!newComment.trim() || sending)
      return;

    try {
      setSending(true);

      const payload: {
        content: string;
        parent?: number;
      } = {
        content: newComment,
      };

      if (replyingTo) {
        payload.parent = replyingTo.id;
      }

      const comment =
        await createComment(
          postId,
          payload
        );

      onCommentCreated(comment);

      setNewComment("");
      setReplyingTo(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="
      fixed
      bottom-0
      left-0
      right-0
      bg-[#090909]/95
      backdrop-blur-xl
      border-t
      border-zinc-800
      p-3
      z-50
      "
    >
      <div className="max-w-2xl mx-auto">

        {replyingTo && (
          <div
            className="
            mb-3
            flex
            items-start
            justify-between
            rounded-xl
            border
            border-zinc-800
            bg-[#111]
            p-3
            "
          >
            <div className="flex gap-3">

              <FiCornerUpLeft
                className="mt-1 text-red-400"
              />

              <div>

                <div className="text-xs text-red-400 font-medium">
                  Replying to{" "}
                  {replyingTo.author_name}
                </div>

                <div className="text-xs text-zinc-400 truncate max-w-xs">
                  {replyingTo.content}
                </div>

              </div>
            </div>

            <button
              onClick={() =>
                setReplyingTo(null)
              }
              className="
              text-zinc-500
              hover:text-white
              "
            >
              <FiX />
            </button>
          </div>
        )}

        <div
          className="
          flex
          items-end
          gap-3
          "
        >
          <textarea
            rows={1}
            value={newComment}
            onChange={(e) =>
              setNewComment(
                e.target.value
              )
            }
            onInput={(e) => {
              e.currentTarget.style.height =
                "auto";

              e.currentTarget.style.height =
                `${e.currentTarget.scrollHeight}px`;
            }}
            placeholder={
              replyingTo
                ? "Write a reply..."
                : "መልስ ጻፍ..."
            }
            className="
            flex-1
            bg-[#111]
            text-white
            rounded-2xl
            px-4
            py-3
            outline-none
            resize-none
            border
            border-zinc-800
            focus:border-red-500/40
            max-h-40
            "
          />

          <button
            onClick={handleComment}
            disabled={
              sending ||
              !newComment.trim()
            }
            className="
            h-12
            w-12
            rounded-full
            flex
            items-center
            justify-center
            bg-red-600/15
            border
            border-red-500/30
            text-red-400
            hover:bg-red-600/25
            hover:border-red-500/50
            disabled:opacity-40
            transition
            "
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}