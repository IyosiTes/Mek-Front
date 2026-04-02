import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";


const ProfileMenu = () => {
  
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button onClick={() => setOpen(!open)}>
        <FaUser className="w-5 h-5 cursor-pointer hover:text-Hover transition" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">

          <p className="px-3 py-2 text-sm text-gray-600 border-b">
            Hey, {user?.username}
          </p>

          <Link
            to="/profile"
            className="block px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            My Account
          </Link>

        

        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

