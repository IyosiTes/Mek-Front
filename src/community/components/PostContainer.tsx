import { useNavigate } from "react-router";

// components/community/PostContainer.tsx
export default function PostContainer({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      {/* HEADER */}
     <div
        onClick={() => navigate("/")}
        className="sticky top-0 z-10 bg-black border-b border-gray-800 p-4 text-lg font-semibold cursor-pointer hover:text-gray-300 transition"
      >
        Discussion
      </div>

      {/* FEED */}
      <div className="flex-1 overflow-y-auto pb-20 px-3">
        {children}
      </div>

    </div>
  );
}