/**
 * Logo de Pokébola como SVG inline (requisito de la rúbrica: un SVG en JSX,
 * no como <img src>). Reutilizado en Navbar y LoadingState.
 */
export default function PokeballLogo({ size = 36, className = "", spinning = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pokébola"
      className={`${spinning ? "animate-spin" : ""} ${className}`}
    >
      <circle cx="18" cy="18" r="16" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <path d="M2 18 A16 16 0 0 1 34 18 Z" fill="#DC0A2D" stroke="#1A1A1A" strokeWidth="3" />
      <line x1="2" y1="18" x2="34" y2="18" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="18" cy="18" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="18" cy="18" r="2" fill="#1A1A1A" />
    </svg>
  );
}
