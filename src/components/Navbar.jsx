import { NavLink } from "react-router-dom";
import PokeballLogo from "./PokeballLogo.jsx";

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
          <PokeballLogo size={36} />
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
