import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ListFilter,
  LoaderCircle,
} from "lucide-react";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonDetailModal } from "../components/PokemonDetailModal";
import { usePokedex } from "../context/usePokedex";

const PokemonPage = () => {
  const { pokemon, search, loading, error } = usePokedex();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const itemsPerPage = 32;
  const query = search.trim().toLowerCase();
  const availableTypes = [
    ...new Set(pokemon.flatMap((poke) => poke.types)),
  ].sort();
  const filteredPokemon = pokemon.filter(
    (poke) =>
      (poke.name.toLowerCase().includes(query) ||
        String(poke.id).includes(query) ||
        poke.types.some((t) => t.toLowerCase().includes(query))) &&
      (selectedType === "all" || poke.types.includes(selectedType)),
  );
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const activePage = Math.min(currentPage, totalPages);
  const pageStart = (activePage - 1) * itemsPerPage;
  const visiblePokemon = filteredPokemon.slice(
    pageStart,
    pageStart + itemsPerPage,
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const filterControls = (
    <div className="pokemon-filter-bar">
      <label className="pokemon-filter-label" htmlFor="pokemon-type-filter">
        <ListFilter size={16} />
        FILTER BY TYPE
      </label>
      <select
        id="pokemon-type-filter"
        className="pokemon-type-filter"
        value={selectedType}
        onChange={(event) => {
          setSelectedType(event.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="all">ALL TYPES</option>
        {availableTypes.map((type) => (
          <option key={type} value={type}>
            {type.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );

  if (loading) {
    return (
      <div className="status-display loading-state">
        <div className="pokeball-spinner">
          <LoaderCircle size={48} strokeWidth={2.4} className="spinner-icon" />
        </div>
        <h2>ACCESSING POKÉDEX DATABASE...</h2>
        <p>Retrieving Pokémon records from Kanto region</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-display error-state">
        <h2>SYSTEM ERROR</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (filteredPokemon.length > 0) {
    return (
      <div className="pokemon-list-container">
        {filterControls}
        <div className="Pokemons">
          {visiblePokemon.map((poke, index) => (
            <PokemonCard
              key={poke.name}
              poke={poke}
              index={index}
              onClick={setSelectedPokemon}
            />
          ))}
        </div>

        {selectedPokemon && (
          <PokemonDetailModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            onSelectPokemon={setSelectedPokemon}
            allPokemon={pokemon}
          />
        )}

        {totalPages > 1 && (
          <nav className="pokemon-pagination" aria-label="Pokémon pages">
            <button
              type="button"
              className="pagination-button"
              onClick={() => handlePageChange(Math.max(1, activePage - 1))}
              disabled={activePage === 1}
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page${
                      page === activePage ? " active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === activePage ? "page" : undefined}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="pagination-button"
              onClick={() =>
                handlePageChange(Math.min(totalPages, activePage + 1))
              }
              disabled={activePage === totalPages}
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      {filterControls}
      <div className="status-display empty-state">
        <h2>NO DATA FOUND</h2>
        <p>No Pokémon matched your search or selected filter.</p>
      </div>
    </div>
  );
};

export default PokemonPage;
