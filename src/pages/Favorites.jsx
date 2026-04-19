import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import PokemonCard from "../components/PokemonCard.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function Favorites() {
  const { favorites } = useFavorites();
  const count = favorites.length;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl mb-2">Mis favoritos</h1>
        <p className="font-pixel text-[10px] text-pokedex-gray-dark">
          {count === 0
            ? "Sin Pokémon guardados aún"
            : `${count} ${count === 1 ? "Pokémon guardado" : "Pokémon guardados"}`}
        </p>
      </header>

      {count === 0 ? (
        <EmptyState
          title="Aún no tienes favoritos"
          message="Explora la Pokédex y marca los que más te gusten para tenerlos siempre a mano."
          action={
            <Link
              to="/explorar"
              className="inline-block bg-pokeball-red text-white font-pixel text-xs px-4 py-3 border-3 border-pokeball-black shadow-nes-sm hover:-translate-y-0.5 transition-transform"
            >
              Ir a Explorar
            </Link>
          }
        />
      ) : (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          role="list"
        >
          {favorites.map((p) => (
            <li key={p.id}>
              <PokemonCard id={p.id} name={p.name} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
