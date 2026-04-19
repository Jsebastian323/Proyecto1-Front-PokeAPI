/**
 * Input controlado de búsqueda. El padre maneja el estado y lo filtra en tiempo real.
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar Pokémon...",
  label = "Buscar Pokémon por nombre o ID",
}) {
  return (
    <div className="relative">
      <label htmlFor="pokemon-search" className="sr-only">
        {label}
      </label>
      <input
        id="pokemon-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 border-3 border-pokeball-black bg-white font-sans text-base focus:outline-none focus:shadow-nes-sm"
      />
      <svg
        aria-hidden="true"
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinecap="square"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16" y2="16" />
      </svg>
    </div>
  );
}
