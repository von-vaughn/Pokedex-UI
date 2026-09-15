import { PokemonCard } from "../components/PokemonCard";
import { PokeballIcon } from "../components/pokemonIcons";
import { usePokedex } from "../context/usePokedex";

const PokemonPage = () => {
  const { pokemon, search, loading, error } = usePokedex();
  const query = search.trim().toLowerCase();
  const filteredPokemon = pokemon.filter(
    (poke) =>
      poke.name.toLowerCase().includes(query) ||
      String(poke.id).includes(query) ||
      poke.types.some((t) => t.toLowerCase().includes(query)),
  );

  if (loading) {
    return (
      <div className="status-display loading-state">
        <div className="pokeball-spinner">
          <PokeballIcon size={48} />
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
      <div className="Pokemons">
        {filteredPokemon.map((poke) => (
          <PokemonCard key={poke.name} poke={poke} />
        ))}
      </div>
    );
  }

  return (
    <div className="status-display empty-state">
      <h2>NO DATA FOUND</h2>
      <p>No Pokémon matched your search query "{search}"</p>
    </div>
  );
};

export default PokemonPage;
