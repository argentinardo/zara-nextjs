# Zara Phone Store

[Demo en producción](https://zara-damian.netlify.app/)
[Entorno de desarrollo en producción](https://development--zara-damian.netlify.app/)



Aplicacion web para la visualizacion, busqueda y gestion de un catalogo de telefonos moviles con carrito de compras.

## Tecnologias

- **Node 18**
- **React 18** + **TypeScript**
- **Vite**
- **React Router v6**
- **React Context API**
- **CSS Plano** con metodologia BEM y variables CSS y uso de clases para baja especificidad
- **Vitest** + **React Testing Library**
- **ESLint** + **Prettier**

## Arquitectura

### Estructura del proyecto

```
src/
├── assets/         # Iconos SVG (logo, carrito, chevron, close)
├── components/     # Componentes reutilizables con sus estilos y tests
├── context/        # CartContext con persistencia en localStorage
├── hooks/          # Extracción de lógica de los componentes
├── pages/          # Wrappers de pagina
├── router/         # Configuracion de rutas
├── services/       # Capa de comunicacion con la API REST
├── styles/         # Estilos globales (reset, tokens, imports)
├── test/           # Setup de Vitest
└── types/          # Interfaces y tipos TypeScript
```

### Gestion de estado

Se utiliza **React Context API** para el carrito de compras. Se eligio Context en lugar de Redux o Zustand porque:

- El estado compartido es reducido (solo el carrito).
- No hay necesidad de middlewares ni logica asincrona compleja en el store.
- El carrito se persiste en `localStorage` para mantener los datos entre sesiones.

### Estilos

- **CSS con BEM**: Cada componente tiene su archivo `.css` colocado junto al componente. Los estilos se importan desde un archivo central `components.css` para mantener un unico punto de entrada.
- **Variables CSS** definidas en `tokens.css` para colores, espaciado y configuracion del grid responsive.
- **Media queries** en cada archivo de componente para breakpoints de tablet (< 1200px) y mobile (< 768px).

### Comunicacion con la API

- Cliente HTTP generico en `services/http/client.ts` que gestiona la autenticacion (`x-api-key`) y la URL base.
- Las variables de entorno (`VITE_API_URL`, `VITE_API_KEY`) se leen desde `.env.local` y se validan al arrancar.
- El servicio `productsService` expone metodos tipados para obtener el listado y el detalle de productos.

### Routing

Tres vistas principales bajo un Layout compartido:

| Ruta | Vista | Descripcion |
|------|-------|-------------|
| `/` | Listado | Grid de 20 telefonos con buscador en tiempo real |
| `/products/:id` | Detalle | Specs, selectores de color/storage, productos similares |
| `/cart` | Carrito | Items anadidos, precio total, eliminar items |

### Testing

- Tests unitarios de componentes con **Vitest** y **React Testing Library**.

### Accesibilidad

- **HTML semantico y etiquetas de accesibilidad**

## Scripts

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (assets sin minimizar) |
| `npm run build` | Build de produccion (assets concatenados y minimizados) |
| `npm run preview` | Vista previa del build de produccion |
| `npm run lint` | Ejecuta ESLint |
| `npm run lint:fix` | Corrige errores de ESLint |
| `npm run format` | Formatea con Prettier |
| `npm run format:check` | Verifica formato |
| `npm run test` | Ejecuta tests en modo watch |
| `npm run test:run` | Ejecuta tests una vez |
| `npm run test:coverage` | Tests con reporte de cobertura |

## Instalacion y ejecucion

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd zara

# Instalar dependencias
npm install

# Configurar variables de entorno
renombrar .env.example .env.local
# Editar .env.local con los valores reales

# Modo desarrollo
npm run dev

# Modo produccion
npm run build
npm run dev
```

## Variables de entorno

El proyecto requiere dos variables de entorno en un archivo `.env.local`:

| Variable | Descripcion |
|----------|-------------|
| `VITE_API_URL` | URL base de la API REST |
| `VITE_API_KEY` | Clave de autenticacion para el header `x-api-key` |

Consultar `.env.example` como referencia.
