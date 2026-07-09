import { FiLoader } from "react-icons/fi";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
};

export default function AuthButton({
  children,
  loading = false,
  disabled = false,
  type = "submit",
}: Props) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className="
        w-full
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        py-3

        bg-red-600
        text-white
        font-medium

        hover:bg-red-700

        disabled:opacity-60
        disabled:cursor-not-allowed

        transition
      "
    >
      {loading && (
        <FiLoader className="animate-spin" />
      )}

      {children}
    </button>
  );
}