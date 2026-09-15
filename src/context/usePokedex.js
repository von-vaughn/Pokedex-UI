import { useContext } from "react";
import { PokedexContext } from "./PokedexContextValue";

export const usePokedex = () => {
  const context = useContext(PokedexContext);

  if (!context) {
    throw new Error("usePokedex must be used within a PokedexProvider");
  }

  return context;
};
