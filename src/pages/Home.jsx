import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
      <p className="font-pixel text-xs text-pokeball-red mb-4">
        GEN I · POKÉDEX
      </p>
      <h1 className="text-3xl sm:text-5xl leading-tight mb-6">
        ¡Atrápalos a todos!
      </h1>
      <p className="text-base sm:text-lg text-pokeball-black/80 mb-10 max-w-xl mx-auto">
        Explora todos los Pokémon, busca por nombre, revisa estadísticas y
        guarda tus favoritos en tu Pokédex personal.
      </p>
      <Link
        to="/explorar"
        className="inline-block bg-pokeball-red text-white font-pixel text-sm px-6 py-4 border-3 border-pokeball-black shadow-nes hover:-translate-y-0.5 transition-transform"
      >
        Empezar a explorar
      </Link>
    </section>
  );
}
