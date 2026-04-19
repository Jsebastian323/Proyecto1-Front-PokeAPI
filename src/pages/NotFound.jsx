import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="font-pixel text-xs text-pokeball-red mb-4">ERROR 404</p>
      <h1 className="text-4xl sm:text-6xl mb-6">Pokémon no encontrado</h1>
      <p className="text-pokeball-black/70 mb-10">
        Esta ruta se escapó de la Pokébola. Intenta con otra dirección.
      </p>
      <Link
        to="/"
        className="inline-block bg-pokeball-red text-white font-pixel text-sm px-6 py-4 border-3 border-pokeball-black shadow-nes hover:-translate-y-0.5 transition-transform"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
