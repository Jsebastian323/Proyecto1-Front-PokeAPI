import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkPatternModal from "../components/DarkPatternModal.jsx";
import { useToast } from "../context/ToastContext.jsx";

const PROMO_KEY = "pokedex-promo-seen";

export default function Home() {
  const { showToast } = useToast();
  // El dark pattern aparece una vez por sesión (session storage) para no
  // ser INFINITAMENTE molesto — pero aún así aparece sin que nadie lo pidió,
  // que es justamente parte del anti-patrón.
  const [promoOpen, setPromoOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(PROMO_KEY)) {
      const timer = setTimeout(() => setPromoOpen(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePromo = () => {
    sessionStorage.setItem(PROMO_KEY, "1");
    setPromoOpen(false);
  };

  const handleAccept = () => {
    closePromo();
    showToast({
      type: "info",
      message: "¡Gracias! (broma: el modo Premium no existe, era un dark pattern demo)",
      duration: 6000,
    });
  };

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

      <DarkPatternModal
        open={promoOpen}
        onAccept={handleAccept}
        onReject={closePromo}
      />
    </section>
  );
}
