// Validadores del formulario de contacto.
// Regla general: todo se ejecuta sobre el valor ya trimeado para que los
// espacios en blanco no pasen por válidos.

export const MIN_NAME = 2;
export const MIN_MESSAGE = 10;

export function isValidName(value) {
  return value.trim().length >= MIN_NAME;
}

export function isValidEmail(value) {
  // Regex simple pero suficiente para validación en frontend.
  // (el backend real debe validar con un sistema más robusto)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidMessage(value) {
  return value.trim().length >= MIN_MESSAGE;
}
