import { useEffect, useState } from "react";
import { fetchPokemonList } from "../services/pokemonApi";

export const usePokemonData = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchPokemonList()
      .then((records) => {
        if (isMounted) setPokemon(records);
      })
      .catch((fetchError) => {
        console.error(fetchError);
        if (isMounted) setError("Unable to load Pokémon right now.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { pokemon, loading, error };
};
