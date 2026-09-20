import { useEffect, useState } from "react";
import {
  fetchAbilityInfo,
  fetchEvolutionChain,
  fetchPokemonById,
  fetchPokemonSpecies,
} from "../services/pokemonApi";

export const usePokemonDetailData = (pokemon) => {
  const [fetchedDetails, setFetchedDetails] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionStages, setEvolutionStages] = useState([]);
  const [abilityDescriptions, setAbilityDescriptions] = useState({});

  const activePokemon =
    fetchedDetails && fetchedDetails.id === pokemon?.id
      ? fetchedDetails
      : pokemon;

  useEffect(() => {
    let isMounted = true;
    if (!pokemon?.id) return undefined;

    const needsFetch =
      !pokemon.stats?.length ||
      !pokemon.moves?.length ||
      !pokemon.abilities?.length;

    if (!needsFetch) return undefined;

    fetchPokemonById(pokemon.id, pokemon)
      .then((details) => {
        if (isMounted) setFetchedDetails(details);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details from PokéAPI:", error);
      });

    return () => {
      isMounted = false;
    };
  }, [pokemon]);

  useEffect(() => {
    let isMounted = true;
    if (!activePokemon?.id) return undefined;

    const loadSpeciesData = async () => {
      try {
        const species = await fetchPokemonSpecies(activePokemon.id);
        if (!isMounted) return;

        setSpeciesData(species);
        const stages = species?.evolutionChainUrl
          ? await fetchEvolutionChain(species.evolutionChainUrl)
          : [{ id: activePokemon.id, name: activePokemon.name, trigger: "" }];

        if (isMounted) setEvolutionStages(stages);
      } catch (error) {
        console.error("Error loading Pokémon detail data:", error);
      }
    };

    loadSpeciesData();

    return () => {
      isMounted = false;
    };
  }, [activePokemon?.id, activePokemon?.name]);

  useEffect(() => {
    let isMounted = true;
    if (!activePokemon?.abilities?.length) return undefined;

    const loadAbilities = async () => {
      const descriptions = {};
      await Promise.all(
        activePokemon.abilities.map(async (item) => {
          const rawName = (item.ability?.name || item.name || "").toLowerCase();
          descriptions[rawName] = await fetchAbilityInfo(
            item.ability?.url || rawName,
          );
        }),
      );

      if (isMounted) setAbilityDescriptions(descriptions);
    };

    loadAbilities();

    return () => {
      isMounted = false;
    };
  }, [activePokemon]);

  return {
    activePokemon,
    speciesData,
    evolutionStages,
    abilityDescriptions,
  };
};
