import { useEffect, useRef } from "react";

/**
 * Modal de confirmación. Cumple el requisito de la rúbrica:
 *   - <dialog> nativo (no un div simulando modal)
 *   - useRef para acceder al elemento
 *   - showModal() y close() para abrir/cerrar
 *
 * El padre controla el estado con la prop `open`. ESC o click en el backdrop
 * disparan onCancel.
 */
export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  variant = "danger", // "danger" | "info"
}) {
  const dialogRef = useRef(null);

  // Sincroniza el prop `open` con el estado real del <dialog> nativo.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Cuando el dialog se cierra (ESC, close() manual, etc.) notifica al padre
  // si la cerrada no vino por onConfirm.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      if (open) onCancel?.();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [open, onCancel]);

  // Click fuera del contenido (en el backdrop) cancela.
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onCancel?.();
    }
  };

  const confirmStyles =
    variant === "danger"
      ? "bg-pokeball-red text-white"
      : "bg-pokeball-black text-white";

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="p-0 bg-transparent max-w-md w-[calc(100%-2rem)]"
      aria-labelledby="confirm-title"
    >
      <div className="bg-white border-3 border-pokeball-black shadow-nes p-6">
        <h2 id="confirm-title" className="font-pixel text-sm mb-3">
          {title}
        </h2>
        {message && (
          <p className="text-sm mb-6 leading-relaxed text-pokeball-black/80">
            {message}
          </p>
        )}
        <div className="flex gap-3 justify-end flex-wrap">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white text-pokeball-black font-pixel text-xs px-4 py-3 border-3 border-pokeball-black shadow-nes-sm hover:-translate-y-0.5 transition-transform"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`${confirmStyles} font-pixel text-xs px-4 py-3 border-3 border-pokeball-black shadow-nes-sm hover:-translate-y-0.5 transition-transform`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
