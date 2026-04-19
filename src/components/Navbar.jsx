import { NavLink } from "react-router-dom";

// Logo de Pokébola como SVG inline (requisito de la rúbrica)
function PokeballLogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Pokédex"
    >
      <circle cx="18" cy="18" r="16" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <path d="M2 18 A16 16 0 0 1 34 18 Z" fill="#DC0A2D" stroke="#1A1A1A" strokeWidth="3" />
      <line x1="2" y1="18" x2="34" y2="18" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="18" cy="18" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="18" cy="18" r="2" fill="#1A1A1A" />
    </svg>
  );
}

const linkBase =
  "px-3 py-2 font-pixel text-xs tracking-wide border-3 border-pokeball-black transition-transform hover:-translate-y-0.5";
const linkInactive = "bg-white text-pokeball-black hover:bg-pokedex-gray";
const linkActive = "bg-pokeball-red text-white shadow-nes-sm";

export default function Navbar() {
  return (
    <nav
      className="bg-pokeball-red border-b-4 border-pokeball-black text-white"
      aria-label="Navegación principal"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <NavLink to="/" className="flex items-center gap-3">
          <PokeballLogo />
          <span className="font-pixel text-sm sm:text-base">Pokédex</span>
        </NavLink>

        <ul className="flex flex-wrap items-center gap-2" role="list">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explorar"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Explorar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Favoritos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Contacto
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
