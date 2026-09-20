import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const navigate = useNavigate();
  const [isCursorOnLeft, setIsCursorOnLeft] = useState(false);

  useEffect(() => {
    const handlePointerMove = (event) => {
      setIsCursorOnLeft(event.clientX < window.innerWidth / 2);
    };

    window.addEventListener("mousemove", handlePointerMove);

    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  return (
    <section className="home-hero-container">
      <div className="home-hero-card">
        {}
        <div className="hero-grid">
          {}
          <div className="hero-left-content">
            <h1 className="hero-main-title">
              <span className="title-row-top">
                <span className="title-word">EXPLORE</span>
                <span className="title-word">THE</span>
              </span>
              <span className="title-row-bottom">
                <span className="title-pokeball">
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    {}
                    <path
                      d="M 50,4 A 46,46 0 0,1 96,50 L 68,50 A 18,18 0 0,0 32,50 L 4,50 A 46,46 0 0,1 50,4 Z"
                      fill="#ea3838"
                      stroke="#111827"
                      strokeWidth="6"
                    />
                    {}
                    <path
                      d="M 50,96 A 46,46 0 0,1 4,50 L 32,50 A 18,18 0 0,0 68,50 L 96,50 A 46,46 0 0,1 50,96 Z"
                      fill="#ffffff"
                      stroke="#111827"
                      strokeWidth="6"
                    />
                    {}
                    <circle cx="50" cy="50" r="16" fill="#111827" />
                    {}
                    <circle
                      cx="50"
                      cy="50"
                      r="9"
                      fill="#ffffff"
                      stroke="#111827"
                      strokeWidth="3"
                    />
                  </svg>
                </span>
                <span className="title-pokedex-text">POKÉDEX</span>
              </span>
            </h1>

            <p className="hero-description">
              Discover, learn, and explore over 1,000 Pokémon from every region.
              Your adventure starts here!
            </p>

            <div className="hero-cta-wrapper">
              <button
                type="button"
                className="hero-cta-button"
                onClick={() => navigate("/pokemons")}
              >
                <span className="cta-icon-pokeball">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="#ffffff"
                      stroke="#111827"
                      strokeWidth="2"
                    />
                    <path d="M2 12 A 10,10 0 0,1 22,12 Z" fill="#ea3838" />
                    <line
                      x1="2"
                      y1="12"
                      x2="22"
                      y2="12"
                      stroke="#111827"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="12" r="3.5" fill="#111827" />
                    <circle cx="12" cy="12" r="2" fill="#ffffff" />
                  </svg>
                </span>
                <span className="cta-label">START EXPLORING</span>
                <span className="cta-arrow">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>

          {}
          <div className="hero-right-visual">
            {}
            <div className="hologram-radar-rings">
              <div className="radar-ring ring-outer-cyan"></div>
              <div className="radar-ring ring-red-dashes"></div>
              <div className="radar-ring ring-inner-blue"></div>
              <div className="radar-center-glow"></div>
            </div>

            {}
            <div className="charizard-artwork-wrapper">
              <img
                src={
                  isCursorOnLeft
                    ? "/charizard-left-look.png"
                    : "/charizard-right-look.png"
                }
                alt="Charizard"
                className="charizard-artwork-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
