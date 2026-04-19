import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
