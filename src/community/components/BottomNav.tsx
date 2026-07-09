import { useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiPlus,
  FiBell,
  FiUser,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import { getUnreadCount } from "../communityapi";


export default function BottomNav() {
  const nav = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const isLoggedIn = !!localStorage.getItem("access");
  
useEffect(() => {
  if (!isLoggedIn) return;

  async function loadCount() {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      console.error(err);
    }
  }

  loadCount();
}, [isLoggedIn]);
 const isActive = (path: string) => location.pathname.startsWith(path);
const isHome =
  location.pathname === "/community" ||
  location.pathname === "/community/";
  return (
    <div
      className="
        fixed bottom-0 left-0 w-full
        bg-black/90
        border-t border-red-900/40
        backdrop-blur-md
        z-50
      "
    >
      <div className="flex justify-around items-center h-16 relative">

        {/* HOME */}
        <button
          onClick={() => nav("/community")}
          className={`flex flex-col items-center text-xs transition
${
  isHome
    ? "text-red-500"
    : "text-zinc-500"
}`}
        >
          <FiHome size={20} />
          <span className="mt-1">HOME</span>
        </button>

        {/* SEARCH */}
        <button
          onClick={() => nav("/community/search")}
          className={`flex flex-col items-center text-xs transition
${
  isActive("/community/search")
    ? "text-red-500"
    : "text-zinc-500"
}`}
        >
          <FiSearch size={20} />
          <span className="mt-1">EXPLORE</span>
        </button>

        {/* CREATE */}
        <button
          onClick={() => nav("/community/create")}
          className="
          absolute left-1/2 -translate-x-1/2
          -top-4

            w-11 h-11
          rounded-lg

         flex items-center justify-center

        bg-red-600/15
        border border-red-500/30

       backdrop-blur-md

        text-red-500

      hover:bg-red-600/25
      hover:border-red-500/50

      active:scale-95

      transition-all duration-200
    "
     >
    <FiPlus size={20} />
   </button>

        {/* ALERTS */}
        <button
  onClick={() => nav("/community/notifications")}
  className={`flex flex-col items-center text-xs transition ${
    isActive("/community/notifications")
      ? "text-red-500"
      : "text-zinc-500"
  }`}
>
  <div className="relative">
    <FiBell size={20} />

    {unreadCount > 0 && (
      <span
        className="
          absolute
          -top-2
          -right-2

          min-w-4.5
          h-4.5

          rounded-full

          bg-red-500

          text-[10px]
          font-bold
          text-white

          flex
          items-center
          justify-center
        "
      >
        {unreadCount > 9 ? "9+" : unreadCount}
      </span>
    )}
  </div>

  <span className="mt-1">ALERTS</span>
</button>

        {/* PROFILE */}
        <button
  onClick={() => nav("/community/profile")}
  className={`flex flex-col items-center text-xs transition ${
    isActive("/community/profile")
      ? "text-red-500"
      : "text-zinc-500"
  }`}
        >
          <FiUser size={20} />
          <span className="mt-1">PROFILE</span>
        </button>
      </div>
    </div>
  );
}