import ContactForm from "../components/ContactForm.jsx";

export default function Contact() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl mb-3">Contacto</h1>
        <p className="text-pokeball-black/70 text-sm">
          ¿Tienes dudas, sugerencias o encontraste un bug en la Pokédex?
          Escríbenos.
        </p>
      </header>
      <ContactForm />
    </section>
  );
}
