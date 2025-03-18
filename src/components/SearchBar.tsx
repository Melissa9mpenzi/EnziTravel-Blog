import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search blogs by title or location..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 mb-8 rounded-lg border border-beige-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
    />
  );
};

export default SearchBar;
