import { Outlet, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function AuthLayout() {
  const navigate = useNavigate();

  return (
    <main
      className="
      relative
      min-h-screen
      bg-black
      flex
      items-center
      justify-center
      px-5
      py-10
      "
    >
      <button
        onClick={() => navigate("/")}
        className="
        absolute
        top-5
        left-5

        flex
        items-center
        gap-2

        rounded-xl

        border
        border-zinc-800

        bg-zinc-900

        px-4
        py-2

        text-zinc-300

        hover:text-white
        hover:border-zinc-700

        transition
        "
      >
        <FaArrowLeft />
        Back
      </button>

      <Outlet />
    </main>
  );
}