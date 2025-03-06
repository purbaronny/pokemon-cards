// import { createContext } from 'react';

// export interface Pokemon {
//   name: string;
//   url: string;
// }

// export interface PokemonContextType {
//   pokemonList: Pokemon[];
//   loading: boolean;
//   error: unknown;
//   setSearchQuery: (query: string) => void;
//   setSortByField: (query: string) => void;
// }

// const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// export default PokemonContext;

// import { createContext } from "react";

// interface Pokemon {
//   name: string;
//   url: string;
// }

// interface PokemonContextType {
//   pokemonList: Pokemon[];
//   loading: boolean;
//   error: string | null;
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   setSortByField: (query: string) => void;
// }

// const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// export default PokemonContext;

// import { createContext } from "react";

// export interface Pokemon {
//   name: string;
//   url: string;
// }

// export interface PokemonContextType {
//   pokemonList: Pokemon[];
//   loading: boolean;
//   error: string | null;
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   setSortByField: (query: string) => void;
// }

// const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// export default PokemonContext;







// export const PokemonProvider = ({ children }: { children: ReactNode }) => {
//   const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
//       .then((res) => res.json())
//       .then((data) => {
//         setPokemonList(data.results);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to load Pokémon");
//         setLoading(false);
//       });
//   }, []);

//   // 🔹 Filter Pokémon berdasarkan pencarian
//   const filteredPokemonList = searchQuery
//     ? pokemonList.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : pokemonList;

//   return (
//     <PokemonContext.Provider
//       value={{ pokemonList: filteredPokemonList, loading, error, searchQuery, setSearchQuery }}
//     >
//       {children}
//     </PokemonContext.Provider>
//   );
// };

// export default PokemonContext;

import { createContext } from "react";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortByField: string;
  filterByField: string;
  page: number;
  offset: number;
  setPage: (page: number) => void;
}

export type PokemonAction =
  | { type: "SET_POKEMON_LIST"; payload: Pokemon[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SORT_BY_FIELD"; payload: string }
  | { type: "SET_FILTER_BY_FIELD"; payload: string }
  | { type: "SET_PAGE"; payload: number };;

export const pokemonReducer = (state: PokemonState, action: PokemonAction): PokemonState => {
  switch (action.type) {
    case "SET_POKEMON_LIST":
      return { ...state, pokemonList: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SORT_BY_FIELD":
      return { ...state, sortByField: action.payload };
    case "SET_FILTER_BY_FIELD":
      return { ...state, filterByField: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload, offset: (action.payload - 1) * 20 };
    default:
      return state;
  }
};

export interface PokemonContextType extends PokemonState {
  dispatch: React.Dispatch<PokemonAction>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export default PokemonContext;
