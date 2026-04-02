
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  isAxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";
import { FaArrowLeft, FaBox, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaSignOutAlt} from "react-icons/fa";


interface UserProfileData {
  username: string;
  phone_number: string;
  email: string;
  address: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

   const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  const [profile, setProfile] = useState<UserProfileData>({
    username: "",
    phone_number: "",
    email: "",
    address: "",
  });
  
  const [loading, setLoading] = useState(true);
  
  // Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await api.get("/auth/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (error: unknown) {
      let message = "Failed to load profile";
      if (isAxiosError(error)) {
        message = error.response?.data?.detail || error.response?.data?.message || message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

 
  if (loading) return <p className="text-center mt-10">Loading...</p>;
return (

  <div className="max-w-6xl mx-auto px-4 mt-15">
       {/* 🔙 TOP NAV */}
<div className="flex items-center gap-3 mb-4 text-gray-600">

  {/* Back Button */}
  <button
    onClick={() => navigate("/")}
    className="flex items-center gap-2 hover:text-black transition"
  >
    <FaArrowLeft />
    <span className="hidden sm:inline">Back</span>
  </button>

  {/* Divider */}
  <span className="text-gray-400">/</span>

  {/* Breadcrumb */}
  <span className="text-sm sm:text-base font-medium text-gray-800">
    Profile
  </span>
</div>
      {/* 🔥 RESPONSIVE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔵 LEFT PANEL (Profile + Menu) */}
        <div className="lg:col-span-1 space-y-5">

          {/* PROFILE CARD */}
          <div className="bg-linear-to-br from-yellow-100 via-yellow-50 to-white rounded-2xl shadow p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-700 mb-4 border-2 border-new "></div>

            <h2 className="text-lg font-semibold text-gray-800">
             {user?.username ||  profile.username}
            </h2>

            <p className="text-sm text-gray-500">
              Orthodox Marketplace Member
            </p>
          </div>

          {/* MENU CARD */}
          <div className="bg-white rounded-2xl shadow divide-y">

            <div
              onClick={() => navigate("/orders")}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
            >
              <span className="flex items-center gap-3">
                <FaBox /> Orders
              </span>
              <span>{">"}</span>
            </div>

        

          <button
          onClick={handleLogout}
    className="p-4 flex items-center gap-3 text-red-500 hover:bg-red-50 transition w-full"
      >
  <FaSignOutAlt /> Logout
  </button>
          </div>
        </div>

        {/* 🟢 RIGHT PANEL (User Info) */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-lg font-semibold mb-6 text-gray-700">
              Profile Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">

              {/* PHONE */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-medium">
                    {profile.phone_number || "Not provided"}
                  </p>
                </div>
              </div>

               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-red-400 rounded-full">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-medium">
                    {profile.email || "Not provided"}
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="font-medium">
                    {profile.address || "Not provided"}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;