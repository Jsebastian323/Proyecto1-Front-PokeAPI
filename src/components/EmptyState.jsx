/** Estado vacío — sin resultados o lista sin items. */
export default function EmptyState({
  title = "Sin resultados",
  message,
  action,
}) {
  return (
    <div className="text-center py-20" role="status">
      <svg
        className="mx-auto mb-4 opacity-40"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16" y2="16" />
      </svg>
      <h2 className="font-pixel text-base mb-2">{title}</h2>
      {message && (
        <p className="text-pokeball-black/70 max-w-sm mx-auto mb-6">
          {message}
        </p>
      )}
      {action}
    </div>
  );
}
