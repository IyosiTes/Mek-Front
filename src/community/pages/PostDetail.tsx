import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import {
  getPost,
  getComments,
} from "../communityapi";

import PostDetailCard from "../components/PostDetailCard";
import CommentList from "../components/commentList";
import ReplyBox from "../components/ReplyBox";

import type {
  Post,
  Comment,
} from "../../types/communities";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [post, setPost] =
    useState<Post | null>(null);

  const [comments, setComments] =
    useState<Comment[]>([]);
  
  const [replyingTo, setReplyingTo] =
  useState<Comment | null>(null);  

  const [loading, setLoading] =
    useState(true);

  

  useEffect(() => {
    async function load() {
      try {
        const [postData, commentsData] =
          await Promise.all([
            getPost(Number(id)),
            getComments(Number(id)),
          ]);

        setPost(postData);
        setComments(commentsData);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="sticky top-0 h-16 border-b border-zinc-900 bg-black" />

        <div className="max-w-2xl mx-auto p-5 space-y-4 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-zinc-800" />

          <div className="h-5 w-44 rounded bg-zinc-800" />

          <div className="space-y-2">
            <div className="h-4 rounded bg-zinc-900" />
            <div className="h-4 rounded bg-zinc-900" />
            <div className="h-4 w-2/3 rounded bg-zinc-900" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      pb-40
      "
    >
      {/* Header */}

      <header
        className="
        sticky
        top-0
        z-40
        border-b
        border-zinc-900
        bg-black/90
        backdrop-blur-xl
        "
      >
        <button
          onClick={() => nav("/community")}
          className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          "
        >
          <ArrowLeft
            size={20}
            className="text-zinc-400"
          />

          <div className="text-left">
            <h1 className="font-semibold">
              Post #{post?.public_id}
            </h1>

            <p className="text-xs text-zinc-500">
              ውይይቶች
            </p>
          </div>
        </button>
      </header>

      <main
        className="
        max-w-2xl
        mx-auto
        animate-in
        fade-in
        duration-300
        "
      >
        {post && (
          <PostDetailCard
            post={post}
          />
        )}

        {/* Replies Header */}

        <section
          className="
          px-5
          py-4
          border-b
          border-zinc-900
          "
        >
          <div className="flex items-center justify-between">
            <h2
              className="
              text-sm
              font-semibold
              tracking-wide
              uppercase
              text-zinc-400
              "
            >
              ግብረ-መልሶች
            </h2>

            <span
              className="
              text-sm
              text-zinc-500
              "
            >
              {comments.length}
            </span>
          </div>
        </section>

        {comments.length === 0 ? (
          <div
            className="
            py-20
            px-6
            text-center
            "
          >
            <div className="text-4xl mb-4">
              💬
            </div>

            <h3 className="text-lg font-medium">
              No replies yet
            </h3>

            <p
              className="
              mt-2
              text-sm
              text-zinc-500
              "
            >
              ውይይቱን ለማስጀመር ፈር ቀዳጅ ይሁኑ
            </p>
          </div>
        ) : (
          <CommentList
              comments={comments}
              onReply={setReplyingTo}
/>
        )}
      </main>

      <ReplyBox
    postId={Number(id)}
    replyingTo={replyingTo}
    setReplyingTo={setReplyingTo}
    onCommentCreated={(comment) =>
      setComments((prev) => [
        comment,
        ...prev,
      ])
    }
/>
    </div>
  );
}