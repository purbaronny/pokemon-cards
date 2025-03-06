import { useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import MobileWrapper from "../../components/MobileWrapper";
import usePokemonList from "../../hooks/usePokemonList";
import SortControl from "../../components/sort/SortControl";
import ColumnToggle from "../../components/toggle/ColumnToggle";

const ListPage: React.FC = () => {
  const { pokemonList, loading, error } = usePokemonList();
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSingleColumn, setIsSingleColumn] = useState(false);

  if (error) return <div>Something is wrong :(</div>;

  const sortedPokemon = [...pokemonList].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <MobileWrapper>
      <Header withSearch />
      <div className="flex justify-between items-center px-5 py-2 bg-gray-800 rounded-lg">
        <SortControl sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <ColumnToggle isSingleColumn={isSingleColumn} setIsSingleColumn={setIsSingleColumn} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={`px-5 py-4 grid ${isSingleColumn ? "grid-cols-1" : "grid-cols-2"} gap-5`}>
          {sortedPokemon.map((each, index) => (
            <Card key={index} name={each.name} />
          ))}
        </div>
      )}
    </MobileWrapper>
  );
};

export default ListPage;
