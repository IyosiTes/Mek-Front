import { Outlet } from "react-router-dom";

export default function CommunityLayout() {
   return  (
    <main className="min-h-screen bg-black text-white">
      <Outlet />
    </main>
  );
}; 