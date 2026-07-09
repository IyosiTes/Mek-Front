import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthCard({
  children,
}: Props) {
  return (
    <div
      className="
        w-full
        max-w-md

        rounded-3xl

        border
        border-zinc-800

        bg-zinc-950

        shadow-2xl

        p-8
        sm:p-10
      "
    >
      {children}
    </div>
  );
}