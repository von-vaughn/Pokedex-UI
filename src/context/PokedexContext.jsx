import { useState } from "react";
import { PokedexContext } from "./PokedexContextValue";
import { usePokemonData } from "../hooks/usePokemonData";

export const PokedexProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { pokemon, loading, error } = usePokemonData();

  return (
    <PokedexContext.Provider
      value={{
        pokemon,
        search,
        setSearch,
        loading,
        error,
        selectedPokemon,
        setSelectedPokemon,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
