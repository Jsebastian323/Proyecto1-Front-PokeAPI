import { createContext, useCallback, useContext, useRef, useState } from "react";
import ToastContainer from "../components/ToastContainer.jsx";

/**
 * Context global para mostrar notificaciones toast desde cualquier componente.
 * El ToastContainer se renderiza automáticamente dentro del provider
 * — no hace falta montarlo manualmente en la app.
 */

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * Muestra un toast.
   * @param {{ type?: "success"|"error"|"info", message: string, duration?: number }} opts
   */
  const showToast = useCallback(
    ({ type = "info", message, duration = 4000 }) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, type, message }]);
      if (duration > 0) {
        setTimeout(() => dismissToast(id), duration);
      }
      return id;
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>");
  }
  return ctx;
}
