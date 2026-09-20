import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Home, Search, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { getTypeInfo, PokeballIcon } from "./pokemonIcons";
import { usePokedex } from "../context/usePokedex";

export const Navbar = () => {
  const { pokemon, search, setSearch, setSelectedPokemon } = usePokedex();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter matching pokemon for home page search
  const query = search.trim().toLowerCase();
  const matchingPokemon =
    isHomePage && query
      ? pokemon.filter(
          (poke) =>
            poke.name.toLowerCase().includes(query) ||
            String(poke.id).includes(query) ||
            poke.types.some((t) => t.toLowerCase().includes(query)),
        )
      : [];

  const navItems = [
    {
      to: "/",
      end: true,
      label: "Home",
      icon: <Home size={16} strokeWidth={2.2} />,
    },
    {
      to: "/pokemons",
      label: "Pokémon",
      icon: <PokeballIcon size={16} className="nav-pokeball-icon" />,
    },
  ];

  return (
    <header
      className={`pokedex-navbar-container${isScrolled ? " is-scrolled" : ""}`}
    >
      <motion.nav
        className="pokedex-navbar"
        animate={{
          borderRadius: isScrolled ? 999 : 0,
          boxShadow: isScrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
            : "0 4px 18px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        }}
        transition={{
          borderRadius: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          boxShadow: { duration: 0.45, ease: "easeOut" },
        }}
      >
        <div className="navbar-brand">
          <img
            src="/pokemon-logo.svg"
            alt="Pokémon"
            className="pokemon-brand-logo"
          />
          <div className="navbar-brand-divider"></div>
          <span className="navbar-brand-label">POKÉDEX</span>
        </div>

        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link-btn ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <div className="search-input-wrapper" ref={searchContainerRef}>
            <Search className="search-icon" size={15} strokeWidth={2.2} />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (isHomePage && e.target.value.trim().length > 0) {
                  setIsSearchOpen(true);
                }
              }}
              onFocus={() => {
                if (isHomePage && search.trim().length > 0) {
                  setIsSearchOpen(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsSearchOpen(false);
                } else if (
                  e.key === "Enter" &&
                  isHomePage &&
                  search.trim().length > 0
                ) {
                  setIsSearchOpen(false);
                  navigate("/pokemons");
                }
              }}
              placeholder="Search Pokémon..."
              spellCheck="false"
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  setSearch("");
                  setIsSearchOpen(false);
                }}
                title="Clear search"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            )}

            {/* Dropdown list ONLY in the home page */}
            {isHomePage && isSearchOpen && query.length > 0 && (
              <div className="home-search-dropdown">
                <div className="dropdown-search-header">
                  <span className="dropdown-search-label">
                    <PokeballIcon
                      size={13}
                      className="dropdown-pokeball-icon"
                    />
                    SEARCH RESULTS
                  </span>
                  <span className="dropdown-search-count">
                    {matchingPokemon.length} FOUND
                  </span>
                </div>

                <div className="dropdown-search-list">
                  {matchingPokemon.length > 0 ? (
                    matchingPokemon.slice(0, 8).map((poke) => {
                      const paddedId = String(poke.id).padStart(3, "0");
                      const primaryType = poke.types[0] || "normal";
                      const primaryTypeInfo = getTypeInfo(primaryType);

                      return (
                        <div
                          key={poke.id}
                          className="dropdown-search-item"
                          onClick={() => {
                            setSelectedPokemon(poke);
                            setIsSearchOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedPokemon(poke);
                              setIsSearchOpen(false);
                            }
                          }}
                        >
                          <div
                            className="dropdown-item-avatar"
                            style={{
                              borderColor: `${primaryTypeInfo.color}44`,
                            }}
                          >
                            <img
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
                              alt={poke.name}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`;
                              }}
                            />
                          </div>

                          <div className="dropdown-item-info">
                            <div className="dropdown-item-top">
                              <span className="dropdown-item-id">
                                #{paddedId}
                              </span>
                              <span className="dropdown-item-name">
                                {poke.name.toUpperCase()}
                              </span>
                            </div>

                            <div className="dropdown-item-types">
                              {poke.types.map((type) => {
                                const tInfo = getTypeInfo(type);
                                return (
                                  <span
                                    key={type}
                                    className="dropdown-type-pill"
                                    style={{
                                      backgroundColor: tInfo.color,
                                      color: tInfo.textColor,
                                    }}
                                  >
                                    <span className="dropdown-type-icon">
                                      {tInfo.icon}
                                    </span>
                                    {type.toUpperCase()}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div className="dropdown-item-arrow">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="dropdown-empty-state">
                      <PokeballIcon size={24} className="dropdown-empty-icon" />
                      <span>NO POKÉMON FOUND</span>
                      <p>No results matching &ldquo;{search}&rdquo;</p>
                    </div>
                  )}
                </div>

                {matchingPokemon.length > 0 && (
                  <button
                    type="button"
                    className="dropdown-view-all-btn"
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate("/pokemons");
                    }}
                  >
                    <span>VIEW ALL IN POKÉDEX</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="trainer-profile-wrapper">
            <button
              type="button"
              className="trainer-profile-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              title="Trainer Profile"
            >
              <div className="trainer-avatar-circle">
                <img
                  src="/pfp.jpeg"
                  alt="Trainer"
                  className="trainer-avatar-img"
                />
              </div>
              <ChevronDown
                size={13}
                strokeWidth={2.5}
                className={`dropdown-caret ${userMenuOpen ? "open" : ""}`}
              />
            </button>

            {userMenuOpen && (
              <div className="trainer-dropdown-menu">
                <div className="dropdown-header">
                  <span className="trainer-name">Vaughn M. Evangelista</span>
                  <span className="trainer-rank">Created by</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-stats">
                  <div className="stat-row">
                    <span>BSCS</span>
                    <strong>Student</strong>
                  </div>
                  <div className="stat-row">
                    <span>Pokédex</span>
                    <strong>WMSU</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    </header>
  );
};
