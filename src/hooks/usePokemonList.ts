// import { useContext } from "react";
// import PokemonContext from "../context/PokemonContext";

// const usePokemonList = () => {
//   const context = useContext(PokemonContext);
//   if (context === undefined) {
//     throw new Error('usePokemonList must be used within a PokemonProvider');
//   }
//   return context;
// };

// export default usePokemonList;

import { useContext, useEffect } from "react";
import PokemonContext from "../context/PokemonContext";

const usePokemonList = () => {
  const { pokemonList, loading, error, searchQuery, sortByField, setSearchQuery, setSortByField, setPage, page } = useContext(PokemonContext);

  useEffect(() => {
    setPage(page); // Memastikan data diperbarui saat halaman berubah
  }, [page, setPage]);

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery, setSearchQuery]);

  useEffect(() => {
    setSortByField(sortByField);
  }, [sortByField, setSortByField]);

  return { pokemonList, loading, error, searchQuery, sortByField, setSearchQuery, setSortByField, setPage, page };
};

export default usePokemonList;
