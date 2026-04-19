/** Estado de error con mensaje y botón opcional de reintentar. */
export default function ErrorState({
  message = "Algo salió mal al cargar los datos.",
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="text-center bg-white border-3 border-pokeball-red shadow-nes-sm p-8 max-w-md mx-auto my-12"
    >
      <svg
        className="mx-auto mb-4"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#DC0A2D"
        strokeWidth="3"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <path d="M12 2 L22 20 L2 20 Z" />
        <line x1="12" y1="9" x2="12" y2="14" />
        <line x1="12" y1="17" x2="12" y2="17.5" />
      </svg>
      <p className="font-pixel text-xs mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="bg-pokeball-red text-white font-pixel text-xs px-4 py-3 border-3 border-pokeball-black shadow-nes-sm hover:-translate-y-0.5 transition-transform"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
