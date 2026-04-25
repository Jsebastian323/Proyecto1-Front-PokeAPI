/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Paleta retro Pokédex (GameBoy vibes)
      colors: {
        pokeball: {
          red: "#DC0A2D",       // Primario — rojo Pokébola
          "red-dark": "#A8082A", // Hover / active
          black: "#1A1A1A",      // Borde / texto
        },
        pokedex: {
          bg: "#F5F5F5",         // Fondo claro
          panel: "#FFFFFF",      // Paneles / tarjetas
          gray: "#E0E0E0",       // Gris UI
          "gray-dark": "#888888",
          screen: "#9BBC0F",     // Verde "pantalla" GameBoy (opcional para detalles)
        },
        // Estados
        success: "#4CAF50",
        warning: "#F7D02C",
        danger: "#E53935",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Sombras duras estilo NES
        nes: "4px 4px 0px 0px #1A1A1A",
        "nes-sm": "2px 2px 0px 0px #1A1A1A",
        "nes-lg": "6px 6px 0px 0px #1A1A1A",
        "nes-red": "4px 4px 0px 0px #A8082A",
        "nes-white": "4px 4px 0px 0px #FFFFFF",
        "nes-white-sm": "2px 2px 0px 0px #FFFFFF",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(8deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
