import React from "react";

interface SortControlProps {
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const SortControl: React.FC<SortControlProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <select
      className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none w-80"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="asc">Sort by A-Z</option>
      <option value="desc">Sort by Z-A</option>
    </select>
  );
};

export default SortControl;
