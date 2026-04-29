import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../communityapi";
import { getAnonId } from "../getAnonId";

const MAX_LENGTH = 500;

export default function CreatePost() {
  const [content, setContent] = useState("");
  const nav = useNavigate();

  const length = content.length;
  const isValid = content.trim().length > 0 && length <= MAX_LENGTH;

  const handlePost = async () => {
    if (!isValid) return;

    await createPost({
      content,
      anonymous_id: getAnonId(),
    });

    nav("/community");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={() => nav(-1)} className="text-gray-400">
          ←
        </button>

        <button
          onClick={handlePost}
          disabled={!isValid}
          className={`px-4 py-1 rounded transition ${
            isValid
              ? "bg-main hover:bg-Hover text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Post
        </button>
      </div>

      {/* TEXTAREA */}
      <textarea
        placeholder="What's on your mind? share your thought, faith, or question. Remember to be respectful!!!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={MAX_LENGTH}
        className="w-full h-40 bg-transparent outline-none text-lg resize-none"
      />

      {/* FOOTER INFO */}
      <div className="flex justify-between text-sm mt-2">
        
        {/* LIVE WARNING */}
        <span className={length > MAX_LENGTH ? "text-red-500" : "text-gray-400"}>
          {length}/{MAX_LENGTH}
        </span>

        {/* STATUS */}
        {length > 0 && length <= MAX_LENGTH && (
          <span className="text-ivory">
            Ready to post
          </span>
        )}

        {length > MAX_LENGTH && (
          <span className="text-red-500">
            Too long
          </span>
        )}
      </div>

    </div>
  );
}