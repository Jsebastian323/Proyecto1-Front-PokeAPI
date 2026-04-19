import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { getSpriteUrl } from "../services/pokeApi.js";

/**
 * Tarjeta individual de Pokémon. Enlaza a /pokemon/:id.
 * Muestra estrella si el Pokémon está en favoritos.
 */
export default function PokemonCard({ id, name }) {
  const { isFavorite } = useFavorites();
  const fav = isFavorite(id);
  const paddedId = String(id).padStart(3, "0");

  return (
    <Link
      to={`/pokemon/${id}`}
      className="block bg-pokedex-panel border-3 border-pokeball-black shadow-nes-sm hover:shadow-nes hover:-translate-y-1 transition-all p-4 text-center group relative"
      aria-label={`Ver detalles de ${name}${fav ? " (en favoritos)" : ""}`}
    >
      {fav && (
        <svg
          className="absolute top-2 right-2"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#DC0A2D"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinejoin="miter"
          aria-hidden="true"
        >
          <polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,17 5.5,21 7.5,13.5 2,9 9,9" />
        </svg>
      )}
      <p className="font-pixel text-[10px] text-pokedex-gray-dark mb-2">
        #{paddedId}
      </p>
      <img
        src={getSpriteUrl(id)}
        alt={`Sprite de ${name}`}
        width="96"
        height="96"
        loading="lazy"
        className="mx-auto pixelated group-hover:scale-110 transition-transform"
      />
      <h3 className="font-pixel text-xs mt-2 capitalize">{name}</h3>
    </Link>
  );
}
