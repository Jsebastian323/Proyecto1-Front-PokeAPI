import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import {
  getPokemonListUrl,
  getIdFromUrl,
  LIST_LIMIT,
} from "../services/pokeApi.js";
import PokemonCard from "../components/PokemonCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function Explore() {
  const [query, setQuery] = useState("");
  const { data, loading, error, refetch } = useFetch(getPokemonListUrl());

  // Normaliza la lista: añade id extraído de la URL a cada item.
  const pokemons = useMemo(() => {
    if (!data?.results) return [];
    return data.results.map((p) => ({
      name: p.name,
      id: getIdFromUrl(p.url),
    }));
  }, [data]);

  // Filtrado en tiempo real por nombre o ID.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pokemons;
    return pokemons.filter(
      (p) => p.name.includes(q) || String(p.id) === q
    );
  }, [pokemons, query]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl mb-6">Explorar Pokémon</h1>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar por nombre o ID..."
        />
        {!loading && !error && (
          <p className="font-pixel text-[10px] text-pokedex-gray-dark mt-3">
            {filtered.length} de {pokemons.length} · Gen 1 (primeros{" "}
            {LIST_LIMIT})
          </p>
        )}
      </header>

      {loading && <LoadingState message="Cargando Pokédex..." />}

      {error && (
        <ErrorState
          message="No pudimos cargar la Pokédex. Revisa tu conexión e inténtalo de nuevo."
          onRetry={refetch}
        />
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title="Ningún Pokémon encontrado"
          message={
            query
              ? `No hay resultados para "${query}". Prueba con otro nombre.`
              : "La Pokédex está vacía."
          }
          action={
            query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="bg-pokeball-red text-white font-pixel text-xs px-4 py-3 border-3 border-pokeball-black shadow-nes-sm hover:-translate-y-0.5 transition-transform"
              >
                Limpiar búsqueda
              </button>
            )
          }
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          role="list"
        >
          {filtered.map((p) => (
            <li key={p.id}>
              <PokemonCard id={p.id} name={p.name} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/"
          className="font-pixel text-xs underline hover:text-pokeball-red"
        >
          ← Volver al inicio
        </Link>
      </div>
    </section>
  );
}
