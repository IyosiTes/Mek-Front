import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { createPost } from "../communityapi";

const MAX_LENGTH = 3000;

export default function CreatePost() {

  const token = localStorage.getItem("access");
  const isLoggedIn = !!token;
  const nav = useNavigate();

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const isValid =
    content.trim().length > 0 &&
    content.length <= MAX_LENGTH;

  const handlePost = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);

      await createPost({
        content,
      });

      nav("/community");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="relative min-h-screen bg-black text-white">

      {/* HEADER */}
      <div
        className="
        sticky
        top-0
        z-20
        bg-black/95
        backdrop-blur
        border-b
        border-gray-900
        px-4
        py-4
        flex
        items-center
        justify-between
        "
      >
        <button
          onClick={() => nav(-1)}
        >
          <ArrowLeft size={20} />
        </button>

        <h1
          className="
          text-lg
          font-semibold
          ml-1
          "
        >
          New Post
        </h1>

        <button
          disabled={!isValid || loading}
          onClick={handlePost}
         className="
             px-4
            py-2
          rounded-xl

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
          Publish
        </button>
      </div>

      {/* BODY */}
      <div
        className="
        max-w-2xl
       mx-auto
        px-4
       py-6
        "
      >
         <div
    className="
    rounded-3xl
    border
    border-gray-900
    bg-[#101010]
    p-5
    "
  >
        <div className=" flex items-center gap-3 mb-5">
  <div
    className="
    w-11
    h-11
    rounded-full
    bg-red-950
    flex
    items-center
    justify-center
    font-bold
    text-red-300
    "
  >
    ም
  </div>

  <div>
    <div className="font-medium">
      ምእመን
    </div>

    <div className="text-xs text-gray-500">
      Anonymous member
    </div>
  </div>
</div>
        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="
ሃይማኖታዊ ጥያቄዎች፣
ሐሳብ አስተያየት፥ ግንኙነት፣
ተዐምራት፣ ታሪክ፣ ገጠመኞች
ክርስቲያናዊ ህይወት
            "
          maxLength={MAX_LENGTH}
          className="
         
w-full
min-h-105
bg-transparent
outline-none
resize-none
text-[17px]
leading-8
placeholder:text-gray-600
"
          disabled={loading}
        />
   
        <div
          className="
          mt-4
          flex
          justify-between
          items-center
          text-sm
          "
        >
          <span
            className="
            text-gray-500
            "
          >
            {content.length}
            /
            {MAX_LENGTH}
          </span>

          {isValid &&
           content.length > 0 && (
            <span
              className="
              text-gray-500
              "
            >
              Draft
            </span>
          )}
        </div>
      </div>
    </div>
    
    {/* Guest Overlay */}
{!isLoggedIn && (
  <div
    className="
    absolute
    inset-0
    z-50
    bg-black/35
    backdrop-blur-[2px]
    flex
    items-center
    justify-center
    pointer-events-auto
    "
  >
    {/* Back */}
    <button
      onClick={() => nav("/community")}
      className="
      absolute
      top-5
      left-5
      flex
      items-center
      gap-2
      text-zinc-400
      hover:text-white
      transition
      "
    >
      <ArrowLeft size={18} />
      <span>Back</span>
    </button>

    {/* Small Floating Card */}
    <div
      className="
      w-95
      max-w-[92%]
      rounded-3xl
      border
      border-zinc-800
      bg-[#121212]/95
      backdrop-blur-xl
      shadow-[0_30px_70px_rgba(0,0,0,.6)]
      p-7
      "
    >
      {/* Small Icon */}
     
      <h2
        className="
        mt-5
        text-2xl
        font-bold
        text-white
        "
      >
        Write your first post
      </h2>

      <p
        className="
        mt-3
        text-sm
        leading-6
        text-zinc-400
        "
      >
       ሐሳቦችን ለማንበብ ለሁሉም ክፍት ነው።
        <br />

       በውይይቶች ላይ ምላሽ ለመስጠት ማሳወቂያዎችን ለመቀበል ይግቡ።
      </p>

      <button
        onClick={() => nav("/login")}
        className="
        mt-6
        w-full
        
             py-3
          rounded-full

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
        Sign In
      </button>

      <button
        onClick={() => nav("/register")}
        className="
        mt-3
        w-full
        rounded-full
        border
        border-zinc-700
        py-3
        text-zinc-300
        hover:bg-zinc-900
        transition
        "
      >
        Create Account
      </button>
    </div>
  </div>
)}
</div>
  )}