import PokeballLogo from "./PokeballLogo.jsx";

/** Estado de carga — Pokébola girando + mensaje. */
export default function LoadingState({ message = "Cargando..." }) {
  return (
    <div
      className="text-center py-20"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="inline-block mb-4">
        <PokeballLogo size={56} spinning />
      </div>
      <p className="font-pixel text-xs">{message}</p>
    </div>
  );
}
