import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { PokedexProvider } from "./context/PokedexContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PokedexProvider>
        <App />
      </PokedexProvider>
    </BrowserRouter>
  </StrictMode>,
);
