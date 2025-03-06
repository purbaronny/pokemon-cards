/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer } from "react";
import PokemonContext, { Pokemon, PokemonContextType } from "./PokemonContext";
import fetchPokemonDetails from "../utils/fetchPokemonDetails";

const LIST_STORAGE_KEY = "pokemonListStorage";
const DETAILS_STORAGE_KEY = "pokemonDetailsStorage";
const ITEMS_PER_PAGE = 20;

interface State {
  pokemonList: Pokemon[];
  loading: boolean;
  error: unknown;
  searchQuery: string;
  sortByField: string;
  page: number;
}

const initialState: State = {
  pokemonList: [],
  loading: true,
  error: null,
  searchQuery: "",
  sortByField: "hp",
  page: 1,
};

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case "SET_POKEMON_LIST":
      return { ...state, pokemonList: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload, page: 1 };
    case "SET_SORT_BY":
      return { ...state, sortByField: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export const PokemonProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pokemonList, loading, error, searchQuery, sortByField, page } = state;

  // useEffect(() => {
  //   const fetchPokemonList = async () => {
  //     dispatch({ type: "SET_LOADING", payload: true });
  //     try {
  //       const offset = (page - 1) * ITEMS_PER_PAGE;
  //       const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
  //       if (!response.ok) throw new Error("Failed to fetch Pokémon.");
  //       const data = await response.json() as { results: Pokemon[] };
        
  //       dispatch({ type: "SET_POKEMON_LIST", payload: data.results });
  //     } catch (error) {
  //       dispatch({ type: "SET_ERROR", payload: error });
  //     }
  //   };
  
  //   fetchPokemonList();
  // }, [page]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        let cachedList = localStorage.getItem(LIST_STORAGE_KEY);
        let pokemonData: Pokemon[] = cachedList ? JSON.parse(cachedList) : [];

        if (!cachedList) {
          const offset = (page - 1) * ITEMS_PER_PAGE;
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
          if (!response.ok) throw new Error("Failed to fetch Pokémon.");
          const data = await response.json() as { results: Pokemon[] };

          dispatch({ type: "SET_POKEMON_LIST", payload: data.results });
          // pokemonData = data.results;
          // localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(pokemonData));
        }

        if (searchQuery) {
          const regex = new RegExp(searchQuery, 'i');
          pokemonData = pokemonData.filter(pokemon => regex.test(pokemon.name));
        }

        if (sortByField) {
          const detailsMap = await Promise.all(pokemonData.map(async (each) => {
            let details = sessionStorage.getItem(`${DETAILS_STORAGE_KEY}-${each.name}`);
            if (!details) {
              const detail = await fetchPokemonDetails(each.name);
              sessionStorage.setItem(`${DETAILS_STORAGE_KEY}-${each.name}`, JSON.stringify(detail.data));
              return detail.data;
            }
            return JSON.parse(details);
          }));
          
          detailsMap.sort((a: any, b: any) => (a[sortByField] || 0) - (b[sortByField] || 0));
          pokemonData = detailsMap.map((each) => ({ name: each.name, url: "" }));
        }

        dispatch({ type: "SET_POKEMON_LIST", payload: pokemonData.slice(0, ITEMS_PER_PAGE) });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error });
      }
    };

    fetchPokemonList();
  }, [searchQuery, sortByField, page]);

  const value: PokemonContextType = {
    pokemonList,
    loading,
    error,
    setSearchQuery: (query: string) => dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    setSortByField: (field: string) => dispatch({ type: "SET_SORT_BY", payload: field }),
    setPage: (newPage: number) => dispatch({ type: "SET_PAGE", payload: newPage }),
    page: page
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};
