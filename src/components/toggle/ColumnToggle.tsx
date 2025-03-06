import React from "react";
import { FaThLarge, FaSquare } from "react-icons/fa";

interface ColumnToggleProps {
  isSingleColumn: boolean;
  setIsSingleColumn: (value: boolean) => void;
}

const ColumnToggle: React.FC<ColumnToggleProps> = ({ isSingleColumn, setIsSingleColumn }) => {
  return (
    <div className="flex border border-gray-600 rounded-md">
      <button
        className={`px-5 py-2 ${isSingleColumn ? "bg-gray-900" : "bg-gray-700"}`}
        onClick={() => setIsSingleColumn(false)}
      >
        <FaSquare className="text-white" />
      </button>
      <button
        className={`px-5 py-2 ${isSingleColumn ? "bg-gray-700" : "bg-gray-900"}`}
        onClick={() => setIsSingleColumn(true)}
      >
        <FaThLarge className="text-white" />
      </button>
    </div>
  );
};

export default ColumnToggle;
