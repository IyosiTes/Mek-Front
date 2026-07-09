import { FiCheckCircle} from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import BottomNav from "../components/BottomNav";

export default function ProfilePage() {
  return (
    <div className="min-h-screen    bg-[linear-gradient(to_right,rgba(127,29,29,.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,29,29,.25)_1px,transparent_1px)]
      bg-size-[32px_32px] text-white pb-24">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-black border-b border-zinc-800">
          <div className="px-5 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">
              Profile
            </h1>

     
          </div>
        </div>

        {/* Profile */}
        <div className="px-6 pt-10">

          <div className="flex justify-center">
            <div
              className="
                h-28
                w-28
                rounded-full
                bg-zinc-900
                border-2
                border-red-500/40
                flex
                items-center
                justify-center
              "
            >
              <HiOutlinePhotograph
                className="text-zinc-600"
                size={40}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-center items-center gap-2">
            <h2 className="text-2xl  font-bold">
              User Name
            </h2>

            <FiCheckCircle
              className="text-blue-500"
              size={18}
            />
          </div>

          <p className="mt-3 text-center font-poppins text-zinc-400 leading-7 max-w-sm mx-auto">
            Your profile will soon let you showcase your
            identity, posts, and activity across the
            Mekwerab community.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 py-5">
              <h3 className="text-center text-2xl font-bold">
                —
              </h3>

              <p className="mt-1 text-center text-sm text-zinc-500">
                Posts
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 py-5">
              <h3 className="text-center text-2xl font-bold">
                —
              </h3>

              <p className="mt-1 text-center text-sm text-zinc-500">
                Comments
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 py-5">
              <h3 className="text-center text-2xl font-bold">
                —
              </h3>

              <p className="mt-1 text-center text-sm text-zinc-500">
                Reputation
              </p>
            </div>

          </div>

          {/* Coming Soon */}
          <div
            className="
              mt-10
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
            "
          >
            <h3 className="text-lg font-semibold">
              Coming Soon
            </h3>

            <p className="mt-3 text-sm font-poppins text-zinc-400 leading-7">
              We're building your community profile.
              Soon you'll be able to personalize your
              profile, update your avatar, add a bio,
              and see all your posts and activity in one
              place.
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-300">
                  Customize your profile
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-300">
                  Upload an avatar
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-300">
                  Write your bio
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-300">
                  View your posts & activity
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
      <BottomNav />  
    </div>
  );
}