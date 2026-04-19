import { STAT_LABELS } from "../utils/pokemonTypes.js";

// 255 es el valor máximo teórico de un stat base en la PokeAPI.
const MAX_STAT = 255;

/**
 * Barra horizontal con el valor de un stat base.
 * Color cambia según el valor (bajo/medio/alto).
 */
export default function StatBar({ name, value }) {
  const label = STAT_LABELS[name] ?? name;
  const percent = Math.min(100, (value / MAX_STAT) * 100);

  let barColor = "bg-pokeball-red";
  if (value >= 100) barColor = "bg-success";
  else if (value >= 60) barColor = "bg-warning";

  return (
    <div className="flex items-center gap-3">
      <span className="font-pixel text-[10px] w-20 shrink-0">{label}</span>
      <span className="font-pixel text-[10px] w-8 text-right shrink-0">
        {value}
      </span>
      <div className="flex-1 bg-pokedex-gray border-2 border-pokeball-black h-4 overflow-hidden">
        <div
          role="progressbar"
          aria-label={`${label}: ${value} de ${MAX_STAT}`}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={MAX_STAT}
          className={`${barColor} h-full transition-all`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
