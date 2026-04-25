import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkPatternModal from "../components/DarkPatternModal.jsx";
import { useToast } from "../context/ToastContext.jsx";
import PokeballLogo from "../components/PokeballLogo.jsx";
import { getSpriteUrl, LIST_LIMIT } from "../services/pokeApi.js";

const PROMO_KEY = "pokedex-promo-seen";
// Pokémon estrella de la Gen 1 — Pikachu, Charizard, Mewtwo
const FEATURED_IDS = [25, 6, 150];

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
      message:
        "¡Gracias! (broma: el modo Premium no existe, era un dark pattern demo)",
      duration: 6000,
    });
  };

  return (
    <>
      {/* HERO — fondo oscuro con pokébolas decorativas y glow rojo */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-pokeball-black text-white border-b-4 border-pokeball-red"
      >
        {/* Pokébolas flotantes decorativas (puramente visuales) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-8 left-4 sm:top-12 sm:left-12 opacity-15 animate-float">
            <PokeballLogo size={72} />
          </div>
          <div className="absolute bottom-12 right-6 sm:bottom-20 sm:right-20 opacity-10 animate-float-slow">
            <PokeballLogo size={140} />
          </div>
          <div className="absolute top-1/3 right-12 hidden md:block opacity-20 animate-float">
            <PokeballLogo size={48} />
          </div>
          <div className="absolute bottom-8 left-12 hidden lg:block opacity-15 animate-float-slow">
            <PokeballLogo size={56} />
          </div>
        </div>

        {/* Glow rojo radial detrás del título */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(220,10,45,0.25) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28 lg:py-32 text-center">
          <p className="font-pixel text-[10px] sm:text-xs text-pokeball-red mb-5 tracking-[0.3em]">
            ★ GEN I · POKÉDEX ★
          </p>

          <h1
            id="hero-title"
            className="font-pixel text-2xl sm:text-4xl lg:text-6xl leading-tight mb-6"
          >
            <span className="block mb-3">¡Atrápalos</span>
            <span
              className="text-pokeball-red inline-block"
              style={{ textShadow: "3px 3px 0 #1A1A1A, 6px 6px 0 #FFFFFF" }}
            >
              a todos!
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Tu Pokédex personal con datos en vivo desde la PokeAPI. Explora,
            busca por nombre, revisa estadísticas y guarda tus Pokémon
            favoritos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to="/explorar"
              className="inline-block bg-pokeball-red text-white font-pixel text-xs sm:text-sm px-6 py-4 border-3 border-white shadow-nes-white hover:-translate-y-0.5 transition-transform"
            >
              ► EMPEZAR A EXPLORAR
            </Link>
            <Link
              to="/favoritos"
              className="inline-block bg-transparent text-white font-pixel text-xs sm:text-sm px-6 py-4 border-3 border-white hover:bg-white hover:text-pokeball-black transition-colors"
            >
              ★ VER FAVORITOS
            </Link>
          </div>

          {/* Strip de stats */}
          <div
            className="mt-14 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto"
            role="list"
            aria-label="Estadísticas de la Pokédex"
          >
            <Stat value={LIST_LIMIT} label="Pokémon" />
            <Stat value="18" label="Tipos" />
            <Stat value="API" label="En vivo" />
          </div>
        </div>
      </section>

      {/* Pokémon legendarios — preview con fetch real */}
      <section
        aria-labelledby="featured-title"
        className="max-w-5xl mx-auto px-4 py-12 sm:py-16"
      >
        <h2
          id="featured-title"
          className="font-pixel text-sm sm:text-lg text-center mb-8"
        >
          ⚡ Pokémon legendarios
        </h2>
        <ul
          className="grid grid-cols-3 gap-3 sm:gap-6"
          role="list"
        >
          {FEATURED_IDS.map((id) => (
            <li key={id}>
              <Link
                to={`/pokemon/${id}`}
                className="block bg-white border-3 border-pokeball-black shadow-nes-sm hover:shadow-nes hover:-translate-y-1 transition-all p-4 sm:p-6 text-center group"
                aria-label={`Ver detalle del Pokémon número ${id}`}
              >
                <img
                  src={getSpriteUrl(id)}
                  alt={`Sprite del Pokémon #${String(id).padStart(3, "0")}`}
                  width="96"
                  height="96"
                  loading="lazy"
                  className="mx-auto pixelated group-hover:scale-110 transition-transform"
                />
                <p className="font-pixel text-[10px] mt-3 text-pokedex-gray-dark">
                  #{String(id).padStart(3, "0")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-8">
          <Link
            to="/explorar"
            className="font-pixel text-[10px] sm:text-xs underline hover:text-pokeball-red"
          >
            Ver los {LIST_LIMIT} Pokémon →
          </Link>
        </div>
      </section>

      <DarkPatternModal
        open={promoOpen}
        onAccept={handleAccept}
        onReject={closePromo}
      />
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div
      role="listitem"
      className="bg-white/5 border-3 border-white/30 px-2 py-3 sm:px-3 sm:py-4"
    >
      <p className="font-pixel text-base sm:text-2xl text-pokeball-red mb-1">
        {value}
      </p>
      <p className="font-pixel text-[8px] sm:text-[10px] text-white/70 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}
