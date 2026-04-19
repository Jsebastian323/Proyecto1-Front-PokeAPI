import { TYPE_COLORS, TYPE_LABELS } from "../utils/pokemonTypes.js";

/**
 * Badge con el tipo del Pokémon. Fondo con el color oficial del tipo,
 * pero mantiene el estilo retro (borde grueso negro + sombra dura).
 */
export default function TypeBadge({ type }) {
  const color = TYPE_COLORS[type] ?? "#888888";
  const label = TYPE_LABELS[type] ?? type;

  return (
    <span
      className="inline-block font-pixel text-[10px] px-3 py-2 border-3 border-pokeball-black shadow-nes-sm text-white tracking-wide"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}
