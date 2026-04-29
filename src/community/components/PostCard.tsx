import { useNavigate } from "react-router-dom";
import type { Post } from "../../types/communities";
import { FiMessageCircle } from "react-icons/fi";

export default function PostCard({ post }: { post: Post }) {
  const nav = useNavigate();

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 mb-3 hover:bg-[#1a1a1a]">
      
      {/* CLICKABLE CONTENT */}
      <div onClick={() => nav(`/community/post/${post.public_id}`)}>
        
        {/* TOP */}
        <div className="flex items-center gap-3">
          
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-main flex items-center justify-center text-black font-bold">
            {/*{post.user_name[0]} */}  M
          </div>

          {/* Name + time */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium"> #{post.public_id} {post.user_name}</div>

              {post.is_admin_post && (
                <span className="text-xs bg-red-500 px-2 py-0.5 rounded">
                  ADMIN
                </span>
              )}
            </div>

            <div className="text-xs text-gray-400">
              {post.time_ago}
            </div>
          </div>

        </div>

        {/* CONTENT */}
        <p className="mt-3 text-white text-sm leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="mt-4 flex items-center gap-3 text-gray-400 text-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            nav(`/community/post/${post.public_id}`);
          }}
          className="flex items-center gap-1 hover:text-white"
        >
          <FiMessageCircle size={16} />
          <span>{post.comment_count ?? 0}</span>
        </button>
      </div>

    </div>
  );
}