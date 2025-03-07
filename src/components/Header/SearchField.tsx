import { useEffect, useState } from "react";
import searchIcon from "../../assets/search.png";
import { useDebouncedCallback } from "use-debounce";
import usePokemonList from "../../hooks/usePokemonList";

const SearchField: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const { searchQuery, setSearchQuery } = usePokemonList();

  // 🔹 Debounce pencarian selama 1 detik
  const debounced = useDebouncedCallback((value) => {
    if (setSearchQuery) setSearchQuery(value);
  }, 1000);

  // 🔹 Update localQuery ketika searchQuery dari global state berubah
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      {editing ? (
        <input
          value={localQuery}
          onChange={(e) => {
            setLocalQuery(e.target.value);
            debounced(e.target.value);
          }}
          onBlur={() => setEditing(false)}
          className="px-4 py-[6px] text-sm rounded-xl"
          type="text"
          placeholder="Search..."
        />
      ) : (
        <img
          onClick={() => setEditing(true)}
          src={searchIcon}
          alt="pokemon logo"
          className="w-6 h-5 object-contain"
        />
      )}
    </div>
  );
};

export default SearchField;
