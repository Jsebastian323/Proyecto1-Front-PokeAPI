import { Link } from "react-router-dom";
import { getSpriteUrl } from "../services/pokeApi.js";

/**
 * Tarjeta individual de Pokémon. Enlaza a /pokemon/:id.
 * Muestra ID (padded a 3 dígitos), sprite pixel-art y nombre.
 */
export default function PokemonCard({ id, name }) {
  const paddedId = String(id).padStart(3, "0");

  return (
    <Link
      to={`/pokemon/${id}`}
      className="block bg-pokedex-panel border-3 border-pokeball-black shadow-nes-sm hover:shadow-nes hover:-translate-y-1 transition-all p-4 text-center group"
      aria-label={`Ver detalles de ${name}`}
    >
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
