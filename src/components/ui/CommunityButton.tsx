import { useNavigate } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";

export default function CommunityButton() {
  const nav = useNavigate();

  return (
    <button
      onClick={() => nav("/community")}
      className="fixed bottom-5 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
    >
      <FiMessageCircle size={24} />
    </button>
  );
}