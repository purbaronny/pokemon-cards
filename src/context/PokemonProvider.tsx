import { useEffect, useReducer, useState } from "react";
import PokemonContext, { Pokemon, pokemonReducer, PokemonState } from "./PokemonContext";
import fetchPokemonDetails from "../utils/fetchPokemonDetails";

const LIST_LOCAL_STORAGE_NAME = "pokemonListStorage";

export const PokemonProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const initialState: PokemonState = {
    pokemonList: [],
    loading: true,
    error: null,
    searchQuery: "",
    setSearchQuery: () => {}, 
    sortByField: "hp",
    filterByField: "",
    page: 1,
    offset: 0,
    setPage: () => {},
  };

  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  const [page, setPage] = useState(1);

  const setSearchQuery = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  };

  // const setPage = (newPage: number) => {
  //   dispatch({ type: "SET_PAGE", payload: newPage });
  // };

  // const MAX_FETCH_DATA = 10000;
  useEffect(() => {
    const fetchPokemonList = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        let filteredResults;
        const storedDetail = localStorage.getItem(LIST_LOCAL_STORAGE_NAME);
        if (storedDetail) {
          filteredResults = JSON.parse(storedDetail);
        } else {
          try {
            const offset = (page - 1) * 20;
            //const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${state.searchQuery ? MAX_FETCH_DATA : 20}&offset=${state.offset}`);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
            if (!response.ok) throw new Error("Failed to fetch Pokémon.");
            const data = await response.json();
          
            dispatch({ type: "SET_POKEMON_LIST", payload: data.results });
          } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : "Unknown error occurred" });
          } finally {
            dispatch({ type: "SET_LOADING", payload: false });
          }


          // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${state.searchQuery ? MAX_FETCH_DATA : 20}&offset=${state.offset}`);
          // if (!response.ok) throw new Error("Failed to fetch Pokémon.");
          // const data = await response.json();
          

          // dispatch({ type: "SET_POKEMON_LIST", payload: data.results });
          // filteredResults = data.results;
          // localStorage.setItem(LIST_LOCAL_STORAGE_NAME, JSON.stringify(filteredResults));
        }

        if (state.searchQuery) {
          const regex = new RegExp(state.searchQuery, "i");
          filteredResults = filteredResults.filter((pokemon: Pokemon) => regex.test(pokemon.name));
        }

        if (state.filterByField) {
          filteredResults = filteredResults.filter((pokemon: Pokemon) => pokemon.name.startsWith(state.filterByField));
        }

        if (state.sortByField) {
          const detailsMap = await Promise.all(filteredResults.map(async (each: Pokemon) => {
            const detail = await fetchPokemonDetails(each.name);
            return detail.data;
          }));
          detailsMap.sort((a: any, b: any) => a[state.sortByField] - b[state.sortByField]);

          filteredResults = detailsMap.map((each) => ({
            name: each?.name || "",
            url: "",
          }));
        }

        dispatch({ type: "SET_POKEMON_LIST", payload: filteredResults.slice(0, 20) });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : "Unknown error occurred" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchPokemonList();
  }, [state.searchQuery, state.sortByField, state.filterByField, state.page]);

  return (
    <PokemonContext.Provider value={{ ...state, setSearchQuery, dispatch, page, setPage }}>
      {children}
    </PokemonContext.Provider>
  );
};
