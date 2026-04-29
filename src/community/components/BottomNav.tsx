import { useLocation } from "react-router-dom";
import { FiHome, FiSearch, FiPlus, FiBell, FiUser} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const nav = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 flex justify-around py-3">

      <button
        className={location.pathname === "/community" ? "text-white" : "text-gray-500"}
        onClick={() => nav("/community")}
      >
        <FiHome size={22} />
      </button>

      <button className="text-gray-500">
        <FiSearch size={22} />
      </button>

      <button
        onClick={() => nav("/community/create")}
        className="  bg-sky
  hover:bg-main/90 active:bg-main/80
  p-3 rounded-full -mt-6
  shadow-lg hover:shadow-xl
  ring-1 ring-white/10
  hover:ring-white/20
  transition-all duration-200"
      >
        <FiPlus size={22} />
      </button>

      <button className="text-gray-500">
        <FiBell size={22} />
      </button>

      <button className="text-gray-500">
        <FiUser size={22} />
      </button>
    </div>
  );
}