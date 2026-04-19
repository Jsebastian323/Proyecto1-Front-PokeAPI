import { useState } from "react";
import { useToast } from "../context/ToastContext.jsx";
import {
  isValidEmail,
  isValidMessage,
  isValidName,
  MIN_MESSAGE,
  MIN_NAME,
} from "../utils/validators.js";

/**
 * Formulario controlado de contacto. Valida nombre, email y mensaje.
 * El botón de enviar queda `disabled` hasta que los 3 campos son válidos.
 * Al enviar correctamente dispara un toast de éxito y limpia el form.
 */
export default function ContactForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const errors = {
    name: !isValidName(form.name)
      ? `El nombre debe tener al menos ${MIN_NAME} caracteres.`
      : null,
    email: !isValidEmail(form.email)
      ? "Ingresa un email válido (ej. nombre@dominio.com)."
      : null,
    message: !isValidMessage(form.message)
      ? `El mensaje debe tener al menos ${MIN_MESSAGE} caracteres.`
      : null,
  };

  const isValid = !errors.name && !errors.email && !errors.message;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    // Simulamos envío: en un proyecto real aquí iría un fetch a una API.
    setTimeout(() => {
      showToast({
        type: "success",
        message: "¡Mensaje enviado! Te responderemos pronto.",
      });
      setForm({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setSubmitting(false);
    }, 400);
  };

  const showError = (field) => touched[field] && errors[field];

  const inputBase =
    "w-full px-3 py-3 border-3 bg-white font-sans text-sm focus:outline-none focus:shadow-nes-sm";
  const inputValid = "border-pokeball-black";
  const inputError = "border-pokeball-red";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border-3 border-pokeball-black shadow-nes p-6 md:p-8 flex flex-col gap-5"
    >
      {/* Nombre */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="font-pixel text-[10px] text-pokeball-black"
        >
          Nombre
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          aria-invalid={Boolean(showError("name"))}
          aria-describedby={showError("name") ? "error-name" : undefined}
          className={`${inputBase} ${showError("name") ? inputError : inputValid}`}
        />
        {showError("name") && (
          <p
            id="error-name"
            role="alert"
            className="font-pixel text-[10px] text-pokeball-red"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="font-pixel text-[10px] text-pokeball-black"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          aria-invalid={Boolean(showError("email"))}
          aria-describedby={showError("email") ? "error-email" : undefined}
          className={`${inputBase} ${showError("email") ? inputError : inputValid}`}
        />
        {showError("email") && (
          <p
            id="error-email"
            role="alert"
            className="font-pixel text-[10px] text-pokeball-red"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="font-pixel text-[10px] text-pokeball-black"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          onBlur={handleBlur("message")}
          aria-invalid={Boolean(showError("message"))}
          aria-describedby={
            showError("message") ? "error-message" : undefined
          }
          className={`${inputBase} resize-none ${showError("message") ? inputError : inputValid}`}
        />
        {showError("message") && (
          <p
            id="error-message"
            role="alert"
            className="font-pixel text-[10px] text-pokeball-red"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || submitting}
        className="bg-pokeball-red text-white font-pixel text-xs px-6 py-4 border-3 border-pokeball-black shadow-nes disabled:bg-pokedex-gray disabled:text-pokedex-gray-dark disabled:cursor-not-allowed disabled:shadow-nes-sm enabled:hover:-translate-y-0.5 transition-transform"
      >
        {submitting ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
