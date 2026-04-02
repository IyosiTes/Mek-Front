import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholderTexts?: string[];
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholderTexts = ["Search products...", "Find your favorites..."],
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const currentText = placeholderTexts[currentTextIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setPlaceholder(prev => prev + currentText[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 60); // typing speed
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPlaceholder("");
        setCharIndex(0);
        setCurrentTextIndex((currentTextIndex + 1) % placeholderTexts.length);
      }, 1500); // pause before next text
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentTextIndex, placeholderTexts]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
    >
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="grow px-4 py-2 text-sm sm:text-base focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-main text-bird hover:bg-Hover transition-colors"
      >
        <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </form>
  );
}