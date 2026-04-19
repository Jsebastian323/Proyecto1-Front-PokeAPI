# Pokédex — Proyecto 01 Frontend

SPA en **React + Vite + Tailwind CSS** que consume la [PokeAPI](https://pokeapi.co/) para explorar Pokémon, ver su detalle, guardarlos como favoritos y enviar mensajes desde un formulario de contacto.

> Proyecto 01 — Curso de Frontend 2026-01.

## Vistas

- **Inicio** — landing/hero del proyecto.
- **Explorar** — grid de Pokémon con búsqueda y filtrado en tiempo real.
- **Detalle** (`/pokemon/:id`) — información individual del Pokémon.
- **Favoritos** — Pokémon guardados, persisten entre rutas.
- **Contacto** — formulario controlado con validación.
- **404** — página para rutas no encontradas.

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [React Router](https://reactrouter.com/) para navegación
- [Tailwind CSS](https://tailwindcss.com/) para estilos
- [PokeAPI](https://pokeapi.co/api/v2/pokemon) como fuente de datos

## Cómo ejecutar

```bash
# Instalar dependencias
npm install

# Levantar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

La app quedará disponible en `http://localhost:5173`.

## Estructura del proyecto

```
src/
├── components/   # Componentes reutilizables (.jsx)
├── pages/        # Vistas asociadas a cada ruta
├── hooks/        # Custom hooks (fetch, favoritos, etc.)
├── context/      # Estado global (favoritos)
├── services/     # Llamadas a la PokeAPI
└── utils/        # Helpers
```

## Despliegue

App desplegada en Vercel: _(pendiente)_

## Autor

Proyecto individual — Juan Sebastián Ruiz.
