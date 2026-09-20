import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  X,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Heart,
  Swords,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
  Sun,
  Leaf,
} from "lucide-react";
import { getTypeInfo, PokeballIcon } from "./pokemonIcons";
import {
  formatName,
  formatHeight,
  formatWeight,
  fetchPokemonSpecies,
  fetchEvolutionChain,
  fetchAbilityInfo,
} from "../utils/pokemonDetails";

const STAT_CONFIG = [
  {
    key: "hp",
    label: "HP",
    color: "#68b839",
    icon: <Heart size={15} color="#ef4444" fill="#ef4444" />,
  },
  {
    key: "attack",
    label: "Attack",
    color: "#f97316",
    icon: <Swords size={15} color="#f97316" />,
  },
  {
    key: "defense",
    label: "Defense",
    color: "#eab308",
    icon: <Shield size={15} color="#eab308" />,
  },
  {
    key: "special-attack",
    label: "Sp. Atk",
    color: "#38bdf8",
    icon: <Sparkles size={15} color="#38bdf8" />,
  },
  {
    key: "special-defense",
    label: "Sp. Def",
    color: "#a855f7",
    icon: <ShieldCheck size={15} color="#a855f7" />,
  },
  {
    key: "speed",
    label: "Speed",
    color: "#f43f5e",
    icon: <Zap size={15} color="#f43f5e" />,
  },
];

export const PokemonDetailModal = ({
  pokemon,
  onClose,
  onSelectPokemon,
  allPokemon = [],
}) => {
  const [activeTab, setActiveTab] = useState("STATS");
  const [fetchedDetails, setFetchedDetails] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionStages, setEvolutionStages] = useState([]);
  const [abilityDescriptions, setAbilityDescriptions] = useState({});
  const modalContentRef = useRef(null);

  const activePokemon =
    fetchedDetails && fetchedDetails.id === pokemon?.id
      ? fetchedDetails
      : pokemon;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (!pokemon || !pokemon.id) return;

    const ensureFullPokemonData = async () => {
      const needsFetch =
        !pokemon.stats ||
        pokemon.stats.length === 0 ||
        !pokemon.moves ||
        pokemon.moves.length === 0 ||
        !pokemon.abilities ||
        pokemon.abilities.length === 0;

      if (!needsFetch) return;

      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
        );

        if (!isMounted) return;

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
        } = response.data;

        setFetchedDetails({
          id,
          name: pokemon.name,
          height: height != null ? (height / 10).toFixed(1) : "0.0",
          weight: weight != null ? (weight / 10).toFixed(1) : "0.0",
          types: Array.isArray(types)
            ? types.map((type) => type.type.name)
            : pokemon.types || [],
          stats: stats || [],
          abilities: abilities || [],
          moves: moves || [],
          cries: cries || null,
          speciesUrl: species?.url || null,
          baseExperience: base_experience || null,
        });
      } catch (error) {
        console.error("Error fetching Pokémon details from PokéAPI:", error);
      }
    };

    ensureFullPokemonData();

    return () => {
      isMounted = false;
    };
  }, [
    pokemon?.id,
    pokemon?.stats,
    pokemon?.moves,
    pokemon?.abilities,
    pokemon?.types,
  ]);

  useEffect(() => {
    let isMounted = true;
    if (!activePokemon?.id) return;

    const loadData = async () => {
      try {
        const species = await fetchPokemonSpecies(activePokemon.id);
        if (!isMounted) return;

        setSpeciesData(species);

        if (species?.evolutionChainUrl) {
          const stages = await fetchEvolutionChain(species.evolutionChainUrl);
          if (isMounted) setEvolutionStages(stages);
        } else if (isMounted) {
          setEvolutionStages([
            { id: activePokemon.id, name: activePokemon.name, trigger: "" },
          ]);
        }
      } catch (error) {
        console.error("Error loading Pokémon detail data:", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [activePokemon?.id]);

  useEffect(() => {
    let isMounted = true;
    if (!activePokemon?.abilities || activePokemon.abilities.length === 0)
      return;

    const loadAbilities = async () => {
      const descMap = {};
      await Promise.all(
        activePokemon.abilities.map(async (item) => {
          const rawName = (item.ability?.name || item.name || "").toLowerCase();
          const url = item.ability?.url;
          const description = await fetchAbilityInfo(url || rawName);
          descMap[rawName] = description;
        }),
      );

      if (isMounted) {
        setAbilityDescriptions(descMap);
      }
    };

    loadAbilities();

    return () => {
      isMounted = false;
    };
  }, [activePokemon]);

  if (!pokemon) return null;
  if (!activePokemon) return null;

  const paddedId = String(activePokemon.id).padStart(3, "0");
  const heightInfo = formatHeight(activePokemon?.height ?? pokemon?.height);
  const weightInfo = formatWeight(activePokemon?.weight ?? pokemon?.weight);
  const abilities = (activePokemon.abilities || []).map((item) => {
    const name = item.ability?.name || item.name || "";
    return formatName(name);
  });

  const abilitiesWithDesc = (activePokemon.abilities || []).map((item) => {
    const rawName = (item.ability?.name || item.name || "").toLowerCase();
    const name = formatName(rawName);
    const description =
      abilityDescriptions[rawName] || "Standard ability used by this species.";

    let icon = <Leaf size={16} color="#16a34a" />;
    if (
      rawName.includes("sun") ||
      rawName.includes("chlorophyll") ||
      rawName.includes("fire") ||
      rawName.includes("blaze")
    ) {
      icon = <Sun size={16} color="#eab308" />;
    } else if (
      rawName.includes("water") ||
      rawName.includes("rain") ||
      rawName.includes("torrent")
    ) {
      icon = <Sparkles size={16} color="#0284c7" />;
    }

    return {
      name,
      rawName,
      description,
      isHidden: Boolean(item.is_hidden),
      icon,
    };
  });

  const baseStats = {};
  const stats = activePokemon?.stats || pokemon?.stats || [];
  stats.forEach((stat) => {
    baseStats[stat.stat?.name] = stat.base_stat;
  });

  const evolutionList =
    evolutionStages.length > 0
      ? evolutionStages
      : [{ id: activePokemon.id, name: activePokemon.name }];

  const currentEvoIndex = evolutionList.findIndex(
    (evo) => evo.id === activePokemon.id,
  );

  const handleSelectEvo = (evo) => {
    const found = allPokemon.find(
      (pokemonEntry) =>
        pokemonEntry.id === evo.id ||
        pokemonEntry.name.toLowerCase() === evo.name.toLowerCase(),
    );

    if (found) {
      onSelectPokemon?.(found);
      return;
    }

    onSelectPokemon?.({
      id: evo.id,
      name: evo.name,
      height: activePokemon?.height ?? "1.0",
      weight: activePokemon?.weight ?? "10.0",
      types: activePokemon?.types || pokemon?.types || ["normal"],
      stats: activePokemon?.stats || pokemon?.stats || [],
      abilities: activePokemon?.abilities || pokemon?.abilities || [],
      moves: activePokemon?.moves || pokemon?.moves || [],
    });
  };

  return (
    <div
      className="pokedex-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-pokemon-title"
    >
      <div
        className="pokedex-modal-frame"
        onClick={(event) => event.stopPropagation()}
        ref={modalContentRef}
      >
        <div className="modal-pokedex-header-tab">
          <div className="modal-pokedex-pill">
            <PokeballIcon size={16} className="modal-pokedex-pill-icon" />
            <span className="modal-pokedex-pill-text">POKÉDEX</span>
          </div>
        </div>

        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Pokédex modal"
          title="Close (Esc)"
        >
          <X size={18} strokeWidth={2.6} />
        </button>

        <div className="pokedex-modal-body">
          <div className="modal-left-panel">
            <div className="modal-left-header">
              <div className="modal-id-title-wrap">
                <div className="modal-id-pill">
                  <span>#{paddedId}</span>
                </div>
                <div className="modal-name-group">
                  <h1 id="modal-pokemon-title" className="modal-pokemon-name">
                    {activePokemon.name.toUpperCase()}
                  </h1>
                  <span className="modal-pokemon-genus">
                    {speciesData?.genus || "Seed Pokémon"}
                  </span>
                </div>
              </div>

              <div className="modal-type-badges">
                {(activePokemon.types || []).map((type) => {
                  const typeInfo = getTypeInfo(type);
                  return (
                    <div
                      key={type}
                      className="modal-type-badge"
                      style={{
                        backgroundColor: typeInfo.color,
                        color: typeInfo.textColor,
                      }}
                    >
                      <span className="modal-type-badge-icon">
                        {typeInfo.icon}
                      </span>
                      <span className="modal-type-badge-label">
                        {type.toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="modal-stage-wrapper">
              <div className="modal-thumbnail-carousel">
                <button
                  type="button"
                  className="carousel-arrow-btn"
                  onClick={() =>
                    currentEvoIndex > 0 &&
                    handleSelectEvo(evolutionList[currentEvoIndex - 1])
                  }
                  disabled={currentEvoIndex <= 0}
                  aria-label="Previous form"
                >
                  <ChevronUp size={16} />
                </button>

                <div className="carousel-thumbnails-list">
                  {evolutionList.map((evo) => {
                    const isSelected = evo.id === activePokemon.id;
                    const evoImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`;
                    return (
                      <button
                        key={evo.id}
                        type="button"
                        className={`carousel-thumb-btn ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSelectEvo(evo)}
                        title={formatName(evo.name)}
                      >
                        <img
                          src={evoImg}
                          alt={evo.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`;
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="carousel-arrow-btn"
                  onClick={() =>
                    currentEvoIndex >= 0 &&
                    currentEvoIndex < evolutionList.length - 1 &&
                    handleSelectEvo(evolutionList[currentEvoIndex + 1])
                  }
                  disabled={
                    currentEvoIndex < 0 ||
                    currentEvoIndex >= evolutionList.length - 1
                  }
                  aria-label="Next form"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="modal-artwork-stage">
                <div className="modal-watermark-bg">
                  <PokeballIcon size={250} className="modal-watermark-svg" />
                </div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${activePokemon.id}.png`}
                  alt={activePokemon.name}
                  className="modal-artwork-img"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${activePokemon.id}.png`;
                  }}
                />
                <div className="modal-artwork-shadow"></div>
              </div>
            </div>

            <div className="modal-specs-card">
              <div className="spec-col">
                <span className="spec-label">HEIGHT</span>
                <span className="spec-primary">{heightInfo.metric}</span>
                <span className="spec-secondary">({heightInfo.imperial})</span>
              </div>

              <div className="spec-col">
                <span className="spec-label">WEIGHT</span>
                <span className="spec-primary">{weightInfo.metric}</span>
                <span className="spec-secondary">({weightInfo.imperial})</span>
              </div>

              <div className="spec-col">
                <span className="spec-label">ABILITY</span>
                {abilities.length > 0 ? (
                  abilities.slice(0, 2).map((ability) => (
                    <span key={ability} className="spec-primary ability-line">
                      {ability}
                    </span>
                  ))
                ) : (
                  <span className="spec-secondary">-</span>
                )}
              </div>
            </div>

            <div className="modal-subcard abilities-card">
              <h4 className="subcard-title">COMMON ABILITIES</h4>
              <div className="abilities-card-list">
                {abilitiesWithDesc.length > 0 ? (
                  abilitiesWithDesc.slice(0, 2).map((ability) => (
                    <div key={ability.rawName} className="ability-card-row">
                      <div className="ability-circle-icon">{ability.icon}</div>
                      <div className="ability-content">
                        <span className="ability-title">{ability.name}</span>
                        <p className="ability-description">
                          {ability.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-subcard">-</div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-right-panel">
            <div className="modal-tabs-bar" role="tablist">
              {["STATS"].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`modal-tab-btn ${isActive ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                    {isActive && <span className="tab-active-indicator" />}
                  </button>
                );
              })}
            </div>

            {activeTab === "STATS" && (
              <div className="modal-tab-pane stats-pane">
                <div className="base-stats-container">
                  <h3 className="section-title">BASE STATS</h3>

                  <div className="base-stats-content-grid">
                    <div className="base-stats-list">
                      {STAT_CONFIG.map((stat) => {
                        const value = baseStats[stat.key] ?? 0;
                        const percent =
                          value != null
                            ? Math.min(100, Math.round((value / 160) * 100))
                            : 0;

                        return (
                          <div key={stat.key} className="stat-row-item">
                            <div className="stat-meta">
                              <span className="stat-icon">{stat.icon}</span>
                              <span className="stat-name">{stat.label}</span>
                            </div>
                            <span className="stat-val">{value}</span>
                            <div className="stat-bar-track">
                              <div
                                className="stat-bar-fill"
                                style={{
                                  width: `${percent}%`,
                                  backgroundColor: stat.color,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="modal-subcard evolution-line-card">
                  <h4 className="subcard-title">EVOLUTION LINE</h4>
                  <div className="evolution-line-track">
                    {evolutionStages.map((stage, index) => {
                      const isCurrent = stage.id === activePokemon.id;
                      const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${stage.id}.png`;

                      return (
                        <React.Fragment key={stage.id}>
                          <button
                            type="button"
                            className={`evolution-node ${isCurrent ? "current" : ""}`}
                            onClick={() => handleSelectEvo(stage)}
                            title={`Switch to ${formatName(stage.name)}`}
                          >
                            <div className="evolution-node-avatar">
                              <img
                                src={sprite}
                                alt={stage.name}
                                loading="lazy"
                                onError={(event) => {
                                  event.currentTarget.onerror = null;
                                  event.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.id}.png`;
                                }}
                              />
                            </div>
                            <span className="evolution-node-name">
                              {formatName(stage.name)}
                            </span>
                            {stage.trigger ? (
                              <span className="evolution-node-trigger">
                                {stage.trigger}
                              </span>
                            ) : null}
                          </button>

                          {index < evolutionStages.length - 1 && (
                            <div className="evolution-connector">
                              <ArrowRight
                                size={16}
                                className="connector-arrow"
                              />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "EVOLUTION" && (
              <div className="modal-tab-pane evo-pane">
                <div className="modal-subcard evolution-line-card">
                  <h4 className="subcard-title">EVOLUTION LINE</h4>
                  <div className="evolution-line-track">
                    {evolutionStages.map((stage, index) => {
                      const isCurrent = stage.id === activePokemon.id;
                      const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${stage.id}.png`;

                      return (
                        <React.Fragment key={stage.id}>
                          <button
                            type="button"
                            className={`evolution-node ${isCurrent ? "current" : ""}`}
                            onClick={() => handleSelectEvo(stage)}
                            title={`Switch to ${formatName(stage.name)}`}
                          >
                            <div className="evolution-node-avatar">
                              <img
                                src={sprite}
                                alt={stage.name}
                                loading="lazy"
                                onError={(event) => {
                                  event.currentTarget.onerror = null;
                                  event.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.id}.png`;
                                }}
                              />
                            </div>
                            <span className="evolution-node-name">
                              {formatName(stage.name)}
                            </span>
                            {stage.trigger ? (
                              <span className="evolution-node-trigger">
                                {stage.trigger}
                              </span>
                            ) : null}
                          </button>

                          {index < evolutionStages.length - 1 && (
                            <div className="evolution-connector">
                              <ArrowRight
                                size={16}
                                className="connector-arrow"
                              />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
