import { useContext, useEffect } from "react";
import PokemonContext from "../context/PokemonContext";

const usePokemonList = () => {
  const { pokemonList, loading, error, searchQuery, sortByField, setSearchQuery, setSortByField, setPage, page } = useContext(PokemonContext);

  useEffect(() => {
    setPage(page); // Memastikan data diperbarui saat halaman berubah
  }, [page, setPage]);

  return { pokemonList, loading, error, searchQuery, sortByField, setSearchQuery, setSortByField, setPage, page };
};

export default usePokemonList;
