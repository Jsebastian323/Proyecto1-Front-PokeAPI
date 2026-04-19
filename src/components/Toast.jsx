/**
 * Notificación individual. Color según tipo (success/error/info).
 * El auto-dismiss lo maneja el provider mediante setTimeout.
 */

const TYPE_STYLES = {
  success: "bg-success text-white",
  error: "bg-danger text-white",
  info: "bg-pokeball-black text-white",
};

const TYPE_LABELS = {
  success: "Éxito",
  error: "Error",
  info: "Información",
};

export default function Toast({ type = "info", message, onDismiss }) {
  const style = TYPE_STYLES[type] ?? TYPE_STYLES.info;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${style} border-3 border-pokeball-black shadow-nes p-3 pr-2 flex items-start gap-3`}
    >
      <span className="sr-only">{TYPE_LABELS[type] ?? "Notificación"}:</span>
      <p className="font-pixel text-[10px] leading-relaxed flex-1 pt-1">
        {message}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Cerrar notificación"
        className="font-pixel text-xs w-6 h-6 flex items-center justify-center hover:bg-white/20 shrink-0"
      >
        ×
      </button>
    </div>
  );
}
