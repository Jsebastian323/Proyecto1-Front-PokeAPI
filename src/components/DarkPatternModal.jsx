import { useEffect, useRef } from "react";

/**
 * ============================================================================
 * DARK PATTERN INTENCIONAL — Requisito académico de la rúbrica.
 * ============================================================================
 *
 * Este modal está DISEÑADO A PROPÓSITO para manipular al usuario. Combina
 * varios anti-patrones conocidos de UX:
 *
 *   1. INTRUSIVIDAD:
 *      Aparece al cargar la página sin que el usuario lo haya solicitado.
 *      Interrumpe la tarea que venía a hacer.
 *
 *   2. JERARQUÍA VISUAL MANIPULADA:
 *      El botón "ACEPTAR" es grande, rojo vibrante, con sombra, llama toda
 *      la atención. El "rechazar" es un enlace pequeño, gris, casi oculto.
 *      El usuario es empujado visualmente hacia aceptar.
 *
 *   3. CONFIRMSHAMING:
 *      El texto del botón de rechazar intenta hacer sentir mal al usuario
 *      ("No, no quiero atrapar más Pokémon…"). Busca culpa para forzar el sí.
 *
 *   4. FALSA URGENCIA:
 *      El copy habla de "tiempo limitado" y "exclusivo" para presionar una
 *      decisión rápida sin pensarla.
 *
 * ⚠️  EN PRODUCCIÓN REAL NUNCA USAR ESTE DISEÑO.
 * Los dark patterns dañan la confianza del usuario, son cada vez más
 * regulados por ley (ej. GDPR, CCPA, DSA), y ensucian la marca.
 *
 * Este componente existe SOLO para demostrar que entendemos qué hacen y
 * por qué hay que evitarlos.
 * ============================================================================
 */
export default function DarkPatternModal({ open, onAccept, onReject }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="p-0 bg-transparent max-w-md w-[calc(100%-2rem)]"
      aria-labelledby="darkpattern-title"
    >
      <div className="bg-white border-3 border-pokeball-black shadow-nes p-6 text-center">
        {/* Falsa urgencia visual */}
        <p className="font-pixel text-[10px] text-pokeball-red mb-3 animate-pulse">
          ★ OFERTA POR TIEMPO LIMITADO ★
        </p>

        <h2 id="darkpattern-title" className="font-pixel text-base mb-3">
          ¡Hazte Entrenador Premium!
        </h2>

        <p className="text-sm mb-6 leading-relaxed">
          Accede a estadísticas exclusivas, alertas de nuevos Pokémon y
          contenido que{" "}
          <strong className="text-pokeball-red">solo hoy</strong> es gratis.
        </p>

        {/* Botón aceptar: grande, rojo, imposible de ignorar */}
        <button
          type="button"
          onClick={onAccept}
          className="w-full bg-pokeball-red text-white font-pixel text-sm px-6 py-4 border-3 border-pokeball-black shadow-nes hover:-translate-y-0.5 transition-transform mb-4"
        >
          ¡SÍ, QUIERO SER PREMIUM!
        </button>

        {/* Botón rechazar: texto pequeño gris + confirmshaming */}
        <button
          type="button"
          onClick={onReject}
          className="text-xs text-pokedex-gray-dark underline hover:text-pokeball-black"
        >
          No, no quiero atrapar más Pokémon…
        </button>
      </div>
    </dialog>
  );
}
