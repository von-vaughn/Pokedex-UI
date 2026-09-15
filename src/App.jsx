import { Navigate, Route, Routes, useLocation } from "react-router";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import PokemonPage from "./pages/PokemonPage";
import "./App.css";

const App = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className={`pokedex-app${isHome ? " pokedex-app--home" : ""}`}>
      <Navbar />
      <main className={`pokedex-main${isHome ? " pokedex-main--home" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemons" element={<PokemonPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
