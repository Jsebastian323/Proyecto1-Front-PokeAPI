import { useToast } from "../context/ToastContext.jsx";
import Toast from "./Toast.jsx";

/**
 * Stack de toasts activos. Se posiciona fijo abajo a la derecha (desktop)
 * y full-width en la parte inferior en mobile. Lo renderiza automáticamente
 * el ToastProvider, así que el consumidor no necesita montarlo en ningún lado.
 */
export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 inset-x-4 sm:inset-auto sm:right-4 z-50 flex flex-col gap-2 sm:max-w-sm sm:w-full pointer-events-none"
      aria-label="Notificaciones"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast
            type={t.type}
            message={t.message}
            onDismiss={() => dismissToast(t.id)}
          />
        </div>
      ))}
    </div>
  );
}
