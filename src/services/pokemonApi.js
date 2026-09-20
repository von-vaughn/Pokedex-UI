import axios from "axios";
import { calculateGenderRatio, formatName } from "../utils/pokemonDetails";

const speciesCache = new Map();
const evolutionChainCache = new Map();
const abilityCache = new Map();

const normalizePokemon = (pokemon, fallback = {}) => ({
  ...fallback,
  ...pokemon,
  height: pokemon.height != null ? (pokemon.height / 10).toFixed(1) : "0.0",
  weight: pokemon.weight != null ? (pokemon.weight / 10).toFixed(1) : "0.0",
  types: Array.isArray(pokemon.types)
    ? pokemon.types.map((typeInfo) => typeInfo.type.name)
    : [],
  stats: Array.isArray(pokemon.stats) ? pokemon.stats : [],
  abilities: Array.isArray(pokemon.abilities) ? pokemon.abilities : [],
  moves: Array.isArray(pokemon.moves) ? pokemon.moves : [],
  cries: pokemon.cries || null,
  speciesUrl: pokemon.species?.url || null,
  baseExperience: pokemon.base_experience || null,
});

export const fetchPokemonById = async (id, fallback = {}) => {
  const url = String(id).startsWith("http")
    ? id
    : `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await axios.get(url);
  return normalizePokemon(response.data, fallback);
};

export const fetchPokemonList = async () => {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=151",
  );

  return Promise.all(
    response.data.results.map((pokemon) =>
      fetchPokemonById(pokemon.url, pokemon),
    ),
  );
};

const cleanFlavorText = (text) => {
  if (!text) return "";
  return text
    .replace(/[\f\n\r\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const fetchAbilityInfo = async (nameOrUrl) => {
  if (!nameOrUrl) return "";

  const key = String(nameOrUrl).toLowerCase().trim();
  if (abilityCache.has(key)) return abilityCache.get(key);

  const url = key.startsWith("http")
    ? key
    : `https://pokeapi.co/api/v2/ability/${key}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const englishEffect = data.effect_entries?.find(
      (entry) => entry.language.name === "en",
    );
    const englishFlavor = data.flavor_text_entries?.find(
      (entry) => entry.language.name === "en",
    )?.flavor_text;
    const description = cleanFlavorText(
      englishEffect?.short_effect ||
        englishEffect?.effect ||
        englishFlavor ||
        "",
    );

    abilityCache.set(key, description);
    return description;
  } catch {
    return "";
  }
};

export const fetchPokemonSpecies = async (id) => {
  if (speciesCache.has(id)) return speciesCache.get(id);

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    const data = response.data;
    const englishEntries =
      data.flavor_text_entries?.filter(
        (entry) => entry.language.name === "en",
      ) || [];
    const bestEntry =
      englishEntries.find((entry) =>
        ["red", "blue", "firered", "sword"].includes(entry.version?.name),
      ) || englishEntries[0];
    const speciesDetails = {
      genus:
        data.genera?.find((entry) => entry.language.name === "en")?.genus ||
        "Pokémon",
      flavorText:
        cleanFlavorText(bestEntry?.flavor_text) ||
        "A mysterious Pokémon inhabiting the Pokémon world.",
      genderRate: data.gender_rate,
      genderRatio: calculateGenderRatio(data.gender_rate),
      evolutionChainUrl: data.evolution_chain?.url || null,
    };

    speciesCache.set(id, speciesDetails);
    return speciesDetails;
  } catch {
    return {
      genus: "Pokémon",
      flavorText:
        "Data records currently being calibrated by Pokédex mainframe.",
      genderRate: 1,
      genderRatio: { isGenderless: false, male: 87.5, female: 12.5 },
      evolutionChainUrl: null,
    };
  }
};

export const fetchEvolutionChain = async (url) => {
  if (!url) return [];
  if (evolutionChainCache.has(url)) return evolutionChainCache.get(url);

  try {
    const response = await axios.get(url);
    const stages = [];

    const traverse = (node) => {
      if (!node) return;
      const urlParts = node.species.url.split("/").filter(Boolean);
      const detail = node.evolution_details?.[0];
      let trigger = "";

      if (detail?.min_level != null) trigger = `Lv. ${detail.min_level}`;
      else if (detail?.item) trigger = formatName(detail.item.name);
      else if (detail?.trigger?.name) trigger = formatName(detail.trigger.name);

      stages.push({
        id: parseInt(urlParts[urlParts.length - 1], 10),
        name: node.species.name,
        trigger,
      });
      node.evolves_to?.forEach(traverse);
    };

    traverse(response.data.chain);
    evolutionChainCache.set(url, stages);
    return stages;
  } catch (error) {
    console.error("Failed to fetch evolution chain:", error);
    return [];
  }
};
