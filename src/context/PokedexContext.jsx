import { useEffect, useState } from "react";
import axios from "axios";
import { PokedexContext } from "./PokedexContextValue";

export const PokedexProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151",
        );
        const detailedPokemon = await Promise.all(
          response.data.results.map(async (poke) => {
            const detailResponse = await axios.get(poke.url);
            const {
              id,
              height,
              weight,
              types,
              stats,
              abilities,
              moves,
              cries,
              species,
              base_experience,
            } = detailResponse.data;

            return {
              ...poke,
              id,
              height: height != null ? (height / 10).toFixed(1) : "0.0",
              weight: weight != null ? (weight / 10).toFixed(1) : "0.0",
              types: Array.isArray(types)
                ? types.map((typeInfo) => typeInfo.type.name)
                : [],
              stats: Array.isArray(stats) ? stats : [],
              abilities: Array.isArray(abilities) ? abilities : [],
              moves: Array.isArray(moves) ? moves : [],
              cries: cries || null,
              speciesUrl: species?.url || null,
              baseExperience: base_experience || null,
            };
          }),
        );

        setPokemon(detailedPokemon);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load Pokémon right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  return (
    <PokedexContext.Provider
      value={{ pokemon, search, setSearch, loading, error }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
