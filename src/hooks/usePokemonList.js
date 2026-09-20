import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 32;

export const usePokemonList = (pokemon, search) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("all");
  const query = search.trim().toLowerCase();

  const availableTypes = useMemo(
    () => [...new Set(pokemon.flatMap((poke) => poke.types))].sort(),
    [pokemon],
  );

  const filteredPokemon = useMemo(
    () =>
      pokemon.filter(
        (poke) =>
          (poke.name.toLowerCase().includes(query) ||
            String(poke.id).includes(query) ||
            poke.types.some((type) => type.toLowerCase().includes(query))) &&
          (selectedType === "all" || poke.types.includes(selectedType)),
      ),
    [pokemon, query, selectedType],
  );

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const activePage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
  const pageStart = (activePage - 1) * ITEMS_PER_PAGE;
  const visiblePokemon = filteredPokemon.slice(
    pageStart,
    pageStart + ITEMS_PER_PAGE,
  );

  const changeType = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    availableTypes,
    filteredPokemon,
    visiblePokemon,
    currentPage: activePage,
    totalPages,
    selectedType,
    changeType,
    changePage,
  };
};
