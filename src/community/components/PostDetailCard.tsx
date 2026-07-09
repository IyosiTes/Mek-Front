import type { Post } from "../../types/communities";
import { timeAgo } from "../../utils/timeAgo";
import {
  FiShield,
  FiPaperclip,
} from "react-icons/fi";

export default function PostDetailCard({
  post,
}: {
  post: Post;
}) {
  const DISPLAY_NAME =
    post.author_name || "ምእመን";

  const DISPLAY_INITIAL =
    DISPLAY_NAME.charAt(0);

  return (
    <article
      className={`
      relative
      overflow-hidden

      ${
        post.is_pinned
          ? `
      border-b
      border-red-900/50
      bg-linear-to-r
      from-red-950/20
      via-[#111]
      to-[#111]
      `
          : `
      border-b
      border-zinc-900
      bg-[#0f0f10]
      `
      }

      px-5
      py-6
    `}
    >
      {/* ADMIN STRIPE */}

      {post.is_admin_post && (
        <div
          className="
          absolute
          left-0
          top-0
          bottom-0
          w-1.5

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

        {/* Avatar */}

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

          {/* Name */}

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
                <FiPaperclip size={10} />
                PINNED
              </span>
            )}

          </div>

      

          <div
            className="
            mt-1
            text-xs
            text-zinc-500
            "
          >
            {timeAgo(post.created_at)}
          </div>

        </div>

      </div>

      {/* Content */}

      <div
        className="
        mt-6

        whitespace-pre-wrap
        wrap-break-word

        text-[16px]
        leading-8
        text-zinc-200
        "
      >
        {post.content}
      </div>
    </article>
  );
}