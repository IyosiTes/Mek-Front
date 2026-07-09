import { useEffect, useState } from "react";

const messages = [
  "Connecting to community...",
  "Waking up server...",
  "Loading discussions...",
  "Gathering conversations...",
  "Preparing Orthodox feed...",
];

export default function CommunityLoader() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [longWait, setLongWait] = useState(false);

  useEffect(() => {
    const rotate = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    const waitTimer = setTimeout(() => {
      setLongWait(true);
    }, 30000);

    return () => {
      clearInterval(rotate);
      clearTimeout(waitTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <h1 className="text-white text-2xl font-bold mb-10">
        Confessions
      </h1>

      {!longWait && (
        <>
          <div
            className="
              w-10 h-10
              border-2
              border-zinc-800
              border-t-red-500
              rounded-full
              animate-spin
              mb-6
            "
          />

          <p className="text-zinc-300 text-center text-sm">
            {messages[messageIndex]}
          </p>
        </>
      )}

      {longWait && (
        <div className="w-full max-w-sm">
          <div className="text-red-500 text-xs tracking-[0.3em] mb-4 text-center">
            COMMUNITY_NODE_INITIALIZING
          </div>

          <div className="h-2 bg-zinc-900 rounded overflow-hidden">
            <div
              className="
                h-full
                bg-red-500
                animate-pulse
                w-2/3
              "
            />
          </div>

          <p className="text-zinc-400 text-sm text-center mt-4">
            Server is waking up...
          </p>

          <p className="text-zinc-600 text-xs text-center mt-2">
            First visit may take up to one minute.
          </p>
        </div>
      )}
    </div>
  );
}