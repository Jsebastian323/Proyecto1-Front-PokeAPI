import { createContext, useContext, useEffect, useState } from "react";

/**
 * Context de favoritos. El estado persiste entre rutas (requisito de la rúbrica)
 * y además en localStorage como mejora de UX (sobrevive a recargas).
 *
 * Cada favorito se guarda como { id, name } — los datos completos se re-consultan
 * desde la PokeAPI al entrar al detalle.
 */

const FavoritesContext = createContext(null);
const STORAGE_KEY = "pokedex-favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sincroniza con localStorage en cada cambio.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Si falla (modo privado, cuota llena, etc.) solo ignoramos.
    }
  }, [favorites]);

  const addFavorite = (pokemon) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  const toggleFavorite = (pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
      return "removed";
    }
    addFavorite(pokemon);
    return "added";
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error(
      "useFavorites debe usarse dentro de <FavoritesProvider>"
    );
  }
  return ctx;
}
