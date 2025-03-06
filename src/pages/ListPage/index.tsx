import { useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import MobileWrapper from "../../components/MobileWrapper";
import usePokemonList from "../../hooks/usePokemonList";

const ListPage: React.FC = () => {
  const { pokemonList, loading, error } = usePokemonList();
  const [sortOrder, setSortOrder] = useState("asc");
  const [gridColumns, setGridColumns] = useState(2);

  const sortedPokemonList = sortOrder
    ? [...pokemonList].sort((a, b) => {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      })
    : pokemonList;


  if (error) return <div>Something is wrong :(</div>
  return (
    <MobileWrapper>
      <Header withSearch/>
      <div className="px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* <span className="text-base font-normal font-dm-sans">Sort by</span> */}
          <div className="relative">
            <select
              className="border px-4 py-2 rounded-md text-base font-dm-sans"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">▼</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <span className="text-base font-normal font-dm-sans">Display</span> */}
          <div className="relative">
            <select
              className="border px-4 py-2 rounded-md text-base font-dm-sans"
              value={gridColumns === 2 ? "2" : gridColumns === 1 ? "1" : ""}
              onChange={(e) => setGridColumns(e.target.value === "" ? 2 : Number(e.target.value))}
            >
              <option value=""> </option>
              <option value="1">1 Column</option>
              <option value="2">2 Columns</option>
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">▼</span>
          </div>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={`px-5 py-4 grid ${gridColumns === 1 ? "grid-cols-1" : "grid-cols-2"} gap-5`}>
          {Array.isArray(sortedPokemonList) && sortedPokemonList.map((each, index) => (
            <Card key={index} name={each.name} />
          ))}
        </div>
      )}
    </MobileWrapper>
  );
};

export default ListPage;
