import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function AuthInput({
  label,
  className = "",
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-300">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900

          px-4
          py-3

          text-white
          placeholder:text-zinc-500

          focus:border-red-500
          focus:ring-2
          focus:ring-red-500/20
          focus:outline-none

          disabled:opacity-60
          disabled:cursor-not-allowed

          transition
          ${className}
        `}
      />
    </div>
  );
}