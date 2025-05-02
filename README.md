# Evaluador de score de Crédito Colombiano - CreditScoreAPI

Sistema integral para la evaluación y calificación crediticia, compuesto por un backend (API RESTful con Node.js/Express/MongoDB) y un frontend (React + Vite + Tailwind CSS). Permite a instituciones financieras automatizar el análisis de riesgo y la gestión de solicitudes de crédito.

---

## Características principales

- **Evaluación crediticia automática**: Algoritmo de scoring adaptable a diferentes perfiles.
- **API RESTful**: Backend robusto y seguro, autenticación JWT.
- **Dashboard web**: Interfaz moderna para gestión de clientes y evaluaciones.
- **Persistencia NoSQL**: MongoDB para almacenamiento flexible.
- **Reportes y analítica**: Visualización de estadísticas y tendencias.
- **Testing**: Pruebas unitarias con Jest.

---

## Tecnologías

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticación)
- Jest (testing)

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn-ui

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/[usuario]/credito-colombiano-evaluator.git
cd credito-colombiano-evaluator
```

### 2. Configuración del backend

```bash
cd backend
npm install
cp .env.example .env
# Edita el archivo .env con tu configuración local (ejemplo: URI de MongoDB, JWT_SECRET, etc.)
npm run dev
```
El backend estará disponible por defecto en `http://localhost:3001`.

### 3. Configuración del frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```
El frontend estará disponible por defecto en `http://localhost:5173`.

---

## Estructura del proyecto

```
/backend
  /src
    /config         # Configuración de la app y base de datos
    /controllers    # Lógica de controladores de la API
    /middleware     # Middlewares (autenticación, errores, etc.)
    /models         # Modelos de datos (Mongoose)
    /routes         # Definición de rutas de la API
    /services       # Lógica de negocio y helpers
    /tests          # Pruebas unitarias
  .env.example      # Variables de entorno de ejemplo
  package.json

/frontend
  /src
    /components     # Componentes reutilizables de React
    /pages          # Vistas principales
    /services       # Lógica de conexión con la API
    /hooks          # Custom hooks
    /utils          # Utilidades
    /assets         # Recursos estáticos
  tailwind.config.js
  vite.config.ts
  package.json

README.md
```

---

## Documentación de la API

La documentación Swagger está disponible en `http://localhost:3001/api-docs` cuando el backend está en ejecución.

---

## Pruebas

### Backend

```bash
cd backend
npm test
```

---

## Licencia

MIT

---
