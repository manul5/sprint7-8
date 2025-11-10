# E-commerce Mueblería Hermanos Jota

Aplicación full-stack de e-commerce para mueblería, construida con React en el frontend y Node.js/Express en el backend.

## 🚀 Sitios Desplegados

- **Frontend:** https://client-murex-pi-23.vercel.app
- **Backend/API:** https://sprint5-6-1.onrender.com

## 👥 Integrantes del Equipo

- Giorda Brunella de Lourdes
- Leggerini Rocio
- Naranjo María Candela
- Quevedo Ana Paula
- Vazquez Manuel Francisco

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### Frontend
- React 19
- React Router DOM
- FontAwesome Icons

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18 o superior
- **npm** versión 9 o superior

Verifica las versiones instaladas con:
```bash
node --version
npm --version
```

## ⚙️ Configuración de Variables de Entorno

Para correr el proyecto localmente, debes crear los siguientes archivos de variables de entorno:

### Backend (`backend/.env`)

```
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb+srv://equipo7:zek4Cb6XghNK3Vcf@cluster0.wsfgs1g.mongodb.net/HermanosJota?retryWrites=true&w=majority
```

### Frontend

No es necesario configurar variables de entorno para el frontend si usas la URL local por defecto. Si quieres consumir la API desplegada, puedes modificar la URL directamente en el código fuente (`App.js`).

## 🚀 Instalación

### Opción 1: Instalación automática (recomendado)

Desde la raíz del proyecto, ejecuta:

```bash
npm install
npm run install-all
```

### Opción 2: Instalación manual

1. Instalar dependencias del backend:
```bash
cd backend
npm install
```

2. Instalar dependencias del frontend:
```bash
cd ../client
npm install
```

## 🏃 Ejecución del Proyecto

### Opción 1: Ejecutar ambos servidores simultáneamente (recomendado)

Desde la raíz del proyecto:

```bash
npm run dev
```

Esto iniciará:
- Backend en `http://localhost:3001`
- Frontend en `http://localhost:3000`

### Opción 2: Ejecutar servidores por separado

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

## 📁 Estructura del Proyecto

```
sprint3-4/
├── backend/              # Servidor Express
│   ├── controllers/      # Controladores de rutas
│   ├── routes/          # Definición de rutas
│   ├── productos.js     # Datos de productos
│   ├── server.js        # Punto de entrada del servidor
│   ├── .env.example     # Ejemplo de variables de entorno
│   └── package.json
│
├── client/              # Aplicación React
│   ├── public/          # Archivos estáticos
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── App.js       # Componente principal
│   │   └── index.js     # Punto de entrada
│   └── package.json
│
├── package.json         # Scripts del monorepo
└── README.md
```

## 🔌 API Endpoints

### Productos

- **GET** `/api/productos` - Obtiene todos los productos
  - Respuesta: Array de productos en formato JSON

- **GET** `/api/productos/:id` - Obtiene un producto por ID
  - Parámetros: `id` (número o string)
  - Respuesta: Objeto producto en formato JSON
  - Error 404 si no se encuentra

- **GET** `/api/health` - Verifica el estado del servidor
  - Respuesta: `{ status: "ok", timestamp: "..." }`


## 🎨 Funcionalidades del Frontend

- ✅ Catálogo de productos con carga dinámica desde API
- ✅ Estados de carga y error
- ✅ Vista de detalle de producto con renderizado condicional
- ✅ Carrito de compras con estado en React
- ✅ Contador de items en el carrito (Navbar)
- ✅ Formulario de contacto controlado

## 🏗️ Arquitectura y Decisiones Técnicas

### Backend
- **Arquitectura modular**: Separación de rutas, controladores y datos
- **Middleware personalizado**: Logger de peticiones HTTP
- **Manejo de errores centralizado**: Middleware 404 y error handler global
- **CORS habilitado**: Permite peticiones desde el frontend en desarrollo
- **Variables de entorno**: Configuración flexible con dotenv

### Frontend
- **Arquitectura de componentes**: UI descompuesta en componentes reutilizables
- **Estado con hooks**: Uso de `useState` para manejo de estado local
- **Props para comunicación**: Paso de datos entre componentes padre-hijo
- **Renderizado condicional**: Navegación entre vistas sin React Router
- **Fetch API**: Comunicación con backend propio
- **Proxy configurado**: Simplifica peticiones a la API en desarrollo


## 📦 Build para Producción

Para crear un build optimizado del frontend:

```bash
cd client
npm run build
```

Los archivos optimizados se generarán en `/client/build/`.

## 🐛 Troubleshooting

### El backend no inicia
- Verifica que el puerto 3001 no esté en uso
- Revisa que las dependencias estén instaladas: `npm install` en `/backend`

### El frontend no se conecta al backend
- Asegúrate de que el backend esté corriendo en el puerto 3001
- Verifica el proxy en `/client/package.json`: `"proxy": "http://localhost:3001"`
- Reinicia el servidor de desarrollo del frontend después de cambiar el proxy

### Error de CORS
- Verifica que el middleware `cors()` esté habilitado en `server.js`
- El backend debe estar corriendo antes que el frontend

## 📝 Notas de Desarrollo

- El backend usa datos locales en `productos.js` (sin base de datos por ahora)
- El carrito de compras se mantiene en memoria (se pierde al recargar)
- La navegación usa renderizado condicional (sin React Router todavía)


---

**Sprint 3 y 4 - NEXUS - ITBA**
