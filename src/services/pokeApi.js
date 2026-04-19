// Servicio centralizado para consumir la PokeAPI.
// Mantiene en un solo lugar la base URL y los helpers de armado de URLs.

const BASE_URL = "https://pokeapi.co/api/v2";

// Cuántos Pokémon traer en la lista de Explorar.
// 151 = Gen 1 (los clásicos, perfectos para el vibe retro).
// Cambia a 251, 386, 493, 649, 721, 809, 898, 1025 según la generación.
export const LIST_LIMIT = 151;

/** URL del listado paginado de Pokémon. */
export function getPokemonListUrl(limit = LIST_LIMIT) {
  return `${BASE_URL}/pokemon?limit=${limit}`;
}

/** URL del detalle individual por ID o nombre. */
export function getPokemonDetailUrl(idOrName) {
  return `${BASE_URL}/pokemon/${idOrName}`;
}

/**
 * Extrae el ID numérico de una URL de la PokeAPI.
 * Ej: "https://pokeapi.co/api/v2/pokemon/25/" -> 25
 */
export function getIdFromUrl(url) {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

/**
 * Sprite pixel-art clásico (96x96) — encaja con el estilo retro.
 * No requiere fetch extra: se carga directo desde el repo de sprites.
 */
export function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

/** Artwork oficial de alta resolución (para la vista de detalle). */
export function getOfficialArtUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
