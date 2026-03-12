import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = "Search...", onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
    >
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        className="grow px-4 py-2 text-sm sm:text-base focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-main text-white hover:bg-Hover transition-colors"
      >
        <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </form>
  );
}
