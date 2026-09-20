import axios from "axios";

const speciesCache = new Map();
const evolutionChainCache = new Map();
const abilityCache = new Map();

export const formatName = (name) => {
  if (!name) return "";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatHeight = (heightInMeters) => {
  if (heightInMeters == null) return { metric: "-", imperial: "-" };

  const meters = parseFloat(heightInMeters) || 0;
  const totalInches = meters * 39.3700787;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  const formattedInches = String(inches).padStart(2, "0");

  return {
    metric: `${meters.toFixed(1)} m`,
    imperial: `${feet}'${formattedInches}"`,
  };
};

export const formatWeight = (weightInKg) => {
  if (weightInKg == null) return { metric: "-", imperial: "-" };

  const kilograms = parseFloat(weightInKg) || 0;
  const pounds = (kilograms * 2.20462).toFixed(1);

  return {
    metric: `${kilograms.toFixed(1)} kg`,
    imperial: `${pounds} lbs`,
  };
};

export const calculateGenderRatio = (genderRate) => {
  if (genderRate === undefined || genderRate === null) return null;
  if (genderRate === -1) {
    return { isGenderless: true, male: 0, female: 0 };
  }

  const femalePercent = (genderRate / 8) * 100;
  const malePercent = 100 - femalePercent;

  return {
    isGenderless: false,
    male: Number(malePercent.toFixed(1)),
    female: Number(femalePercent.toFixed(1)),
  };
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
  if (abilityCache.has(key)) {
    return abilityCache.get(key);
  }

  const url = key.startsWith("http")
    ? key
    : `https://pokeapi.co/api/v2/ability/${key}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const englishEffect = data.effect_entries?.find(
      (entry) => entry.language.name === "en",
    );
    const effectText =
      englishEffect?.short_effect || englishEffect?.effect || "";
    const englishFlavor = data.flavor_text_entries?.find(
      (entry) => entry.language.name === "en",
    )?.flavor_text;

    const description = cleanFlavorText(effectText || englishFlavor || "");
    abilityCache.set(key, description);
    return description;
  } catch {
    return "";
  }
};

export const fetchPokemonSpecies = async (id) => {
  if (speciesCache.has(id)) {
    return speciesCache.get(id);
  }

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    const data = response.data;

    const englishGenus =
      data.genera?.find((entry) => entry.language.name === "en")?.genus ||
      "Pokémon";

    const englishEntries =
      data.flavor_text_entries?.filter(
        (entry) => entry.language.name === "en",
      ) || [];

    const bestEntry =
      englishEntries.find(
        (entry) =>
          entry.version?.name === "red" ||
          entry.version?.name === "blue" ||
          entry.version?.name === "firered" ||
          entry.version?.name === "sword",
      ) || englishEntries[0];

    const speciesDetails = {
      genus: englishGenus,
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
  if (evolutionChainCache.has(url)) {
    return evolutionChainCache.get(url);
  }

  try {
    const response = await axios.get(url);
    const chain = response.data.chain;
    const stages = [];

    const traverse = (node) => {
      if (!node) return;

      const speciesName = node.species.name;
      const urlParts = node.species.url.split("/").filter(Boolean);
      const id = parseInt(urlParts[urlParts.length - 1], 10);

      let trigger = "";

      if (node.evolution_details && node.evolution_details.length > 0) {
        const detail = node.evolution_details[0];

        if (detail.min_level != null) {
          trigger = `Lv. ${detail.min_level}`;
        } else if (detail.item) {
          trigger = formatName(detail.item.name);
        } else if (detail.trigger?.name) {
          trigger = formatName(detail.trigger.name);
        }
      }

      stages.push({
        id,
        name: speciesName,
        trigger,
      });

      if (node.evolves_to && node.evolves_to.length > 0) {
        node.evolves_to.forEach((nextNode) => traverse(nextNode));
      }
    };

    traverse(chain);
    evolutionChainCache.set(url, stages);
    return stages;
  } catch (error) {
    console.error("Failed to fetch evolution chain:", error);
    return [];
  }
};
