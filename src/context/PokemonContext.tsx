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

import { createContext } from "react";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonContextType {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSortByField: (query: string) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export default PokemonContext;







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

