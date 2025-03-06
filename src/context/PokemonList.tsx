import { useContext } from "react";
import PokemonContext from "../context/PokemonContext";

const PokemonList = () => {
  const context = useContext(PokemonContext);
  if (!context) return <div>Loading...</div>;

  const { pokemonList, dispatch, searchQuery, sortByField, filterByField } = context;

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchQuery}
        onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
      />

      <select
        value={sortByField}
        onChange={(e) => dispatch({ type: "SET_SORT_BY_FIELD", payload: e.target.value })}
      >
        <option value="hp">HP</option>
        <option value="attack">Attack</option>
        <option value="defense">Defense</option>
      </select>

      <input
        type="text"
        placeholder="Filter by first letter"
        value={filterByField}
        onChange={(e) => dispatch({ type: "SET_FILTER_BY_FIELD", payload: e.target.value })}
      />

      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
