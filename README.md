# Zara Phone Store

[Demo en producción](https://zara-nextjs.vercel.app/)

Aplicación web para la visualización, búsqueda y gestión de un catálogo de teléfonos móviles con carrito de compras. Construida con **Next.js 15 App Router** y renderizado del lado del servidor (SSR).

## Tecnologías

- **Next.js 15** (App Router, Server Components, Server Actions)
- **React 19** + **TypeScript**
- **React Context API** (carrito con persistencia en localStorage)
- **CSS plano** con metodología BEM, variables CSS y clases de baja especificidad
- **Vitest** + **React Testing Library**
- **ESLint** + **Prettier**

## Arquitectura

### Estructura del proyecto

```
src/
├── app/            # App Router de Next.js (layouts y páginas)
│   ├── layout.tsx          # Layout raíz (HTML, providers, MainBar)
│   ├── page.tsx            # Página de inicio (SSR)
│   ├── cart/page.tsx       # Página del carrito
│   └── products/[id]/page.tsx  # Detalle de producto (SSR)
├── components/     # Componentes reutilizables con sus estilos y tests
├── context/        # CartContext con persistencia en localStorage
├── hooks/          # Extracción de lógica de los componentes
├── services/       # Capa de comunicación con la API REST + Server Actions
├── styles/         # Estilos globales (reset, tokens, imports)
├── test/           # Setup de Vitest y mocks de Next.js
└── types/          # Interfaces y tipos TypeScript
public/             # Assets estáticos (SVGs)
```

### Server Components vs Client Components

Next.js App Router distingue entre componentes que se ejecutan en el servidor y en el cliente:

- **Server Components** (`page.tsx` de inicio y de detalle): obtienen datos de la API directamente en el servidor con `async/await`. El HTML llega al navegador ya renderizado con los datos reales.
- **Client Components** (marcados con `'use client'`): gestionan interactividad (estado, eventos, context). Incluyen MainBar, PhoneList, PhoneSpecs, Cart, Searcher, ColorSelector, Storage y MainButton.
- **Server Actions** (`services/actions.ts`): permiten que los componentes cliente ejecuten lógica en el servidor (búsqueda de productos) sin exponer la API key al navegador.

### Gestión de estado

Se utiliza **React Context API** para el carrito de compras. Se eligió Context en lugar de Redux o Zustand porque:

- El estado compartido es reducido (solo el carrito).
- No hay necesidad de middlewares ni lógica asíncrona compleja en el store.
- El carrito se persiste en `localStorage` con hidratación segura para compatibilidad con SSR.

### Estilos

- **CSS con BEM**: Cada componente tiene su archivo `.css` colocado junto al componente. Los estilos se importan desde un archivo central `components.css` para mantener un único punto de entrada.
- **Variables CSS** definidas en `tokens.css` para colores, espaciado y configuración del grid responsive.
- **Media queries** en cada archivo de componente para breakpoints de tablet (< 1200px) y mobile (< 768px).

### Comunicación con la API

- Cliente HTTP genérico en `services/http/client.ts` que gestiona la autenticación (`x-api-key`) y la URL base.
- Las variables de entorno (`API_URL`, `API_KEY`) son **server-only**: se leen con `process.env` y nunca se exponen al navegador.
- El servicio `productsService` expone métodos tipados para obtener el listado y el detalle de productos.
- Para búsquedas desde el cliente se usa un **Server Action** que ejecuta la consulta en el servidor.

### Routing

Next.js App Router con file-based routing. Tres vistas principales bajo un layout compartido:

| Ruta | Renderizado | Descripción |
|------|-------------|-------------|
| `/` | SSR (Server Component) | Grid de 20 teléfonos con buscador en tiempo real |
| `/products/[id]` | SSR (Server Component) | Specs, selectores de color/storage, productos similares |
| `/cart` | CSR (Client Component) | Items añadidos, precio total, eliminar items |

### Testing

- Tests unitarios de componentes con **Vitest** y **React Testing Library**.
- Mocks globales de `next/link` y `next/navigation` en el setup de tests.

### Accesibilidad

- **HTML semántico y etiquetas de accesibilidad** (`aria-label`, roles, navegación por teclado).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build de producción (SSR) |
| `npm run lint` | Ejecuta ESLint con reglas de Next.js |
| `npm run format` | Formatea con Prettier |
| `npm run format:check` | Verifica formato |
| `npm run test` | Ejecuta tests en modo watch |
| `npm run test:run` | Ejecuta tests una vez |
| `npm run test:coverage` | Tests con reporte de cobertura |

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/argentinardo/zara-nextjs.git
cd zara-next

# Instalar dependencias
npm install

# Configurar variables de entorno
# Renombrar .env.example a .env.local y editar con los valores reales
cp .env.example .env.local

# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm run start
```

## Variables de entorno

El proyecto requiere dos variables de entorno en un archivo `.env.local`. Estas variables son **server-only** (no se exponen al cliente):

| Variable | Descripción |
|----------|-------------|
| `API_URL` | URL base de la API REST |
| `API_KEY` | Clave de autenticación para el header `x-api-key` |

Consultar `.env.example` como referencia.
