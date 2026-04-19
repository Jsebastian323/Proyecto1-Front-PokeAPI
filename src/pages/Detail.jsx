import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import {
  getPokemonDetailUrl,
  getOfficialArtUrl,
  LIST_LIMIT,
} from "../services/pokeApi.js";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import TypeBadge from "../components/TypeBadge.jsx";
import StatBar from "../components/StatBar.jsx";

export default function Detail() {
  const { id } = useParams();
  const numericId = Number(id);
  const { data: pokemon, loading, error, refetch } = useFetch(
    getPokemonDetailUrl(id)
  );
  const { isFavorite, toggleFavorite } = useFavorites();

  // Navegación anterior/siguiente dentro del rango disponible.
  const prevId = numericId > 1 ? numericId - 1 : null;
  const nextId = numericId < LIST_LIMIT ? numericId + 1 : null;

  if (loading) return <LoadingState message="Cargando Pokémon..." />;

  if (error) {
    return (
      <div className="py-12">
        <ErrorState
          message="No pudimos cargar este Pokémon. Puede que el ID no exista o haya un problema de red."
          onRetry={refetch}
        />
        <div className="text-center mt-6">
          <Link
            to="/explorar"
            className="font-pixel text-xs underline hover:text-pokeball-red"
          >
            ← Volver a explorar
          </Link>
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

  const fav = isFavorite(pokemon.id);
  const paddedId = String(pokemon.id).padStart(3, "0");

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <Link
          to="/explorar"
          className="font-pixel text-xs underline hover:text-pokeball-red"
        >
          ← Volver a explorar
        </Link>
        <div className="flex gap-2">
          {prevId && (
            <Link
              to={`/pokemon/${prevId}`}
              className="bg-white text-pokeball-black font-pixel text-[10px] px-3 py-2 border-3 border-pokeball-black shadow-nes-sm hover:-translate-y-0.5 transition-transform"
              aria-label={`Ir al Pokémon anterior (${prevId})`}
            >
              ← #{String(prevId).padStart(3, "0")}
            </Link>
          )}
          {nextId && (
            <Link
              to={`/pokemon/${nextId}`}
              className="bg-white text-pokeball-black font-pixel text-[10px] px-3 py-2 border-3 border-pokeball-black shadow-nes-sm hover:-translate-y-0.5 transition-transform"
              aria-label={`Ir al siguiente Pokémon (${nextId})`}
            >
              #{String(nextId).padStart(3, "0")} →
            </Link>
          )}
        </div>
      </div>

      <article className="grid md:grid-cols-2 gap-6 bg-white border-3 border-pokeball-black shadow-nes p-6 md:p-8">
        {/* Panel "pantalla" con la imagen oficial */}
        <div className="bg-pokedex-gray border-3 border-pokeball-black p-4 flex flex-col items-center justify-center">
          <p className="font-pixel text-xs text-pokedex-gray-dark self-start mb-2">
            #{paddedId}
          </p>
          <img
            src={getOfficialArtUrl(pokemon.id)}
            alt={`Imagen oficial de ${pokemon.name}`}
            width="400"
            height="400"
            className="w-full max-w-sm"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-3xl sm:text-4xl capitalize">{pokemon.name}</h1>

          <div
            className="flex gap-2 flex-wrap"
            aria-label="Tipos del Pokémon"
          >
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-pixel text-[10px] text-pokedex-gray-dark mb-1">
                Altura
              </dt>
              <dd className="font-pixel text-sm">
                {(pokemon.height / 10).toFixed(1)} m
              </dd>
            </div>
            <div>
              <dt className="font-pixel text-[10px] text-pokedex-gray-dark mb-1">
                Peso
              </dt>
              <dd className="font-pixel text-sm">
                {(pokemon.weight / 10).toFixed(1)} kg
              </dd>
            </div>
          </dl>

          <section aria-labelledby="stats-heading">
            <h2
              id="stats-heading"
              className="font-pixel text-sm mb-3"
            >
              Estadísticas base
            </h2>
            <div className="space-y-2">
              {pokemon.stats.map((s) => (
                <StatBar
                  key={s.stat.name}
                  name={s.stat.name}
                  value={s.base_stat}
                />
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={() =>
              toggleFavorite({ id: pokemon.id, name: pokemon.name })
            }
            aria-pressed={fav}
            className={`font-pixel text-xs px-4 py-3 border-3 border-pokeball-black shadow-nes hover:-translate-y-0.5 transition-transform mt-2 ${
              fav
                ? "bg-white text-pokeball-black"
                : "bg-pokeball-red text-white"
            }`}
          >
            {fav ? "★ En favoritos" : "☆ Agregar a favoritos"}
          </button>
        </div>
      </article>
    </section>
  );
}
