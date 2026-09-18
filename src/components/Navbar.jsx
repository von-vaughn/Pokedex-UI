import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Home, Search, X } from "lucide-react";
import { NavLink } from "react-router";
import { PokeballIcon } from "./pokemonIcons";
import { usePokedex } from "../context/usePokedex";

export const Navbar = () => {
  const { search, setSearch } = usePokedex();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="search-input-wrapper">
            <Search className="search-icon" size={15} strokeWidth={2.2} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Pokémon..."
              spellCheck="false"
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearch("")}
                title="Clear search"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
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
