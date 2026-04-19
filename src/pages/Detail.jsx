import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl sm:text-3xl mb-6">Detalle del Pokémon #{id}</h1>
      <p className="text-pokeball-black/70">
        Aquí irá la info individual del Pokémon (fetch por ID). (próxima
        sesión)
      </p>
    </section>
  );
}
