import { useNavigate } from "react-router";


export default function PostContainer({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen
      bg-black
       text-white flex flex-col">
      
      {/* HEADER */}
     <div
        onClick={() => navigate("/")}
        className="sticky top-0 z-20 bg-black/95 backdrop-blur border-b border-red-950 px-5 py-4"
      >
        <h1 className="text-2xl font-bold tracking-wide">
        Confessions
     </h1>

     <p className="text-xs text-gray-500 uppercase tracking-[0.25em]">
     Orthodox Community
     </p>
      </div>

      {/* FEED */}
      <div className="flex-1
      bg-[linear-gradient(to_right,rgba(127,29,29,.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,29,29,.25)_1px,transparent_1px)]
      bg-size-[32px_32px]
       overflow-y-auto pb-24 px-3 max-w-2xl mt-2 mx-auto w-full">
        {children}
      </div>

    </div>
  );
}