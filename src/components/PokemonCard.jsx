import React from "react";
import { getTypeInfo, PokeballIcon } from "./pokemonIcons";

export const PokemonCard = ({ poke, index = 0 }) => {
  const paddedId = String(poke.id).padStart(3, "0");
  const primaryType = poke.types[0] || "normal";
  const primaryTypeInfo = getTypeInfo(primaryType);

  return (
    <div
      className="pokemon-card card-fade-in"
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      {/* Outer corner rivets/screws */}
      <div className="card-corner-rivet top-left"></div>
      <div className="card-corner-rivet top-right"></div>
      <div className="card-corner-rivet bottom-left"></div>
      <div className="card-corner-rivet bottom-right"></div>

      {/* Main Inner Card Frame */}
      <div className="card-inner">
        {/* Header Bar */}
        <div className="card-header">
          <div className="card-id-pill">
            <PokeballIcon size={14} className="card-id-icon" />
            <span className="card-id-text">#{paddedId}</span>
          </div>

          <h2 className="card-pokemon-name">{poke.name}</h2>

          <div
            className="card-type-circle"
            style={{ backgroundColor: primaryTypeInfo.color }}
            title={primaryType.toUpperCase()}
          >
            <div className="card-type-circle-icon">{primaryTypeInfo.icon}</div>
          </div>
        </div>

        {/* Pokemon Stage / Screen Box */}
        <div className="card-screen-wrapper">
          <div className="card-screen-frame">
            {/* Tech HUD Corner Reticle */}
            <div className="screen-hud-corner">
              <span className="hud-bar red-bar"></span>
              <span className="hud-bar dark-bar"></span>
            </div>

            {/* Stage Pedestal Grid / Glow */}
            <div className="screen-pedestal"></div>

            {/* Pokemon Artwork */}
            <div className="screen-image-container">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                alt={poke.name}
                loading="lazy"
                className="screen-pokemon-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`;
                }}
              />
            </div>

            {/* Bottom-right watermark emblem */}
            <div className="screen-watermark">
              <PokeballIcon size={30} className="screen-watermark-icon" />
            </div>
          </div>
        </div>

        {/* Middle Specs Ribbon */}
        <div className="card-ribbon">
          <div className="ribbon-type-banner">
            <span>{primaryType.toUpperCase()}</span>
          </div>

          <div className="ribbon-specs">
            <div className="spec-group">
              <span className="spec-label">HEIGHT</span>
              <span className="spec-value">{poke.height} m</span>
            </div>
            <span className="spec-separator">|</span>
            <div className="spec-group">
              <span className="spec-label">WEIGHT</span>
              <span className="spec-value">{poke.weight} kg</span>
            </div>
          </div>
        </div>

        {/* Bottom Tech Panel */}
        <div className="card-bottom-panel">
          <div className="card-types-block">
            <div className="panel-section-title">
              <span className="red-slash">/</span> TYPES
            </div>
            <div className="card-type-pills">
              {poke.types.map((type) => {
                const tInfo = getTypeInfo(type);
                return (
                  <div
                    key={type}
                    className="card-type-pill"
                    style={{
                      backgroundColor: tInfo.color,
                      color: tInfo.textColor,
                    }}
                  >
                    <span className="pill-icon">{tInfo.icon}</span>
                    <span className="pill-label">{type.toUpperCase()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
