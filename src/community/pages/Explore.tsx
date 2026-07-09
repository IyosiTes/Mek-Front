import {
  FiSearch,
  FiClock,
  FiBookOpen,
  FiUsers,
  FiHeart,
  FiShield,
  FiBookmark,

} from "react-icons/fi";
import BottomNav from "../components/BottomNav";
import {
  HiOutlineSparkles,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

import {
  PiChurch,
  PiHandsPraying,
  PiStudent,
  PiBookBookmark,
} from "react-icons/pi";



const categories = [
  {
    title: "ክርስቲያናዊ ሕይወት",
    description: "Daily prayers, intercessions and spiritual growth.",
    icon: PiHandsPraying,
  },
  {
    title: " ንስሐ",
    description: "Anonymous stories, struggles and encouragement.",
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    title: "የመጽሐፍ ቅዱስ ጥናት",
    description: "Scripture discussions and reflections.",
    icon: FiBookOpen,
  },
  {
    title: "የቤተክርስቲያን ታሪክ",
    description: "History of the Orthodox Church and traditions.",
    icon: PiChurch,
  },
  {
    title: "ቅዱሳን",
    description: "Lives, teachings and feast days of the Saints.",
    icon: FiHeart,
  },
  {
    title: " ጋብቻና ቤተሰብ",
    description: "Relationships through Orthodox teaching.",
    icon: FiUsers,
  },
  {
    title: "ወጣትነት",
    description: "Campus life, friendships and spiritual challenges.",
    icon: PiStudent,
  },
  {
    title: "ጾም",
    description: "Guidance and discussions during fasting seasons.",
    icon: FiBookmark,
  },
  {
    title: " ኦርቶዶክሳዊ መጻሕፍት",
    description: "Recommended books and spiritual readings.",
    icon: PiBookBookmark,
  },
  {
    title: "ገዳማዊ ሕይወት",
    description: "Teachings from monasteries and monks.",
    icon: FiShield,
  },
];

export default function SearchPage() {
  
  return (
    <div className="min-h-screen bg-black  text-white">

      {/* Header */}

      <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black/90 backdrop-blur-xl">

        <div className="max-w-5xl mx-auto px-5 py-5">

          <h2 className="text-2xl font-bold">
            Discover
          </h2>

          <p className="mt-1 text-sm font-poppins text-zinc-500">
            Explore upcoming community topics and features.
          </p>

          {/* Fake Search */}

          <button
            className="
            mt-5
            w-full
            flex
            items-center
            gap-3

            rounded-2xl

            border
            border-zinc-800

            bg-[#111]

            px-4
            py-4
            font-poppins
            text-zinc-500

            hover:border-red-500/30
            transition
            "
          >
            <FiSearch size={20} />

            <span>
              Search discussions...
            </span>

            <span className="ml-auto text-xs text-red-400">
              Coming Soon
            </span>
          </button>

        </div>

      </header>

      <main className="max-w-5xl mx-auto px-5 py-6">

        {/* Categories */}

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Popular Categories
          </h2>

          <span className="text-sm text-zinc-500">
            {categories.length}
          </span>

        </div>

        <div className="grid gap-4 mt-5 md:grid-cols-2">

          {categories.map((category) => {

            const Icon = category.icon;

            return (

              <button
                key={category.title}
                className="
                group

                rounded-3xl

                border
                border-zinc-800

                bg-[#101010]

                p-5

                text-left

                transition-all
                duration-300

                hover:border-red-500/40
                hover:-translate-y-1

                active:scale-[0.98]
                "
              >

                <div
                  className="
                  w-12
                  h-12

                  rounded-2xl

                  bg-red-500/10

                  flex
                  items-center
                  justify-center

                  text-red-400

                  group-hover:bg-red-500/20
                  transition
                  "
                >
                  <Icon size={24} />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm font-poppins leading-6 text-zinc-500">
                  {category.description}
                </p>

              </button>

            );

          })}

        </div>

        {/* Coming Soon */}

        <div
          className="
          mt-10

          rounded-3xl

          border
          border-red-900/40

          bg-linear-to-r
          from-red-950/20
          via-[#101010]
          to-[#101010]

          p-6
          "
        >

          <div className="flex items-center gap-3 ">

            <div
              className="
              w-12
              h-12

              rounded-2xl

              bg-red-500/10

              flex
              items-center
              justify-center
              "
            >
              <HiOutlineSparkles
                className="text-red-400"
                size={24}
              />
            </div>

            <div>

              <h2 className="text-lg font-semibold">
                Intelligent Search is Coming
              </h2>

              <p className="text-sm font-poppins text-zinc-500">
                We're building a smarter way to discover the Orthodox community.
              </p>

            </div>

          </div>

          <div className="grid font-poppins grid-cols-2  gap-3 mt-6 ">

            {[
              "Search Posts",
              "Bible Verses",
              "People",
              "Saints",
              "Trending Topics",
              "Saved Posts",
            ].map((feature) => (

              <div
                key={feature}
                className="
                rounded-xl

                border
                border-zinc-800

                bg-black/30

                px-4
                py-3

                flex
                items-center
                gap-3
                "
              >
                <FiClock
                  className="text-red-400"
                  size={16}
                />

                <span className="text-sm text-zinc-300">
                  {feature}
                </span>

              </div>

            ))}

          </div>

        </div>

      </main>
<BottomNav />
    </div>
     
  );
}