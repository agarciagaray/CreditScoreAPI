# Evaluador de score de Crédito Colombiano - CreditScoreAPI

Sistema integral para la evaluación y calificación crediticia, compuesto por un backend (API RESTful con Node.js/Express/MongoDB) y un frontend (React + Vite + Tailwind CSS). Permite a instituciones financieras automatizar el análisis de riesgo y la gestión de solicitudes de crédito.

---

## Características principales

- **Evaluación crediticia automática**: Algoritmo de scoring adaptable a diferentes perfiles.
- **API RESTful**: Backend robusto y seguro, autenticación JWT.
- **Dashboard web**: Interfaz moderna para gestión de clientes y evaluaciones.
- **Persistencia NoSQL**: MongoDB para almacenamiento flexible.
- **Reportes y analítica**: Visualización de estadísticas y tendencias.

---

## Tecnologías

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticación)

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

En otra terminal, desde la raíz del proyecto:

```bash
# El frontend se encuentra en la raíz del proyecto
npm install
npm run dev
```
El frontend estará disponible por defecto en `http://localhost:5173`.

---

## Estructura del proyecto

```
/               # Raíz del proyecto (Contiene el frontend)
  /src
    /components # Componentes reutilizables de React
    /pages      # Vistas principales
    ...
  /public
  /backend
    /src
      /controllers
      /models
      ...
    package.json
  package.json      # package.json del frontend
  vite.config.ts
  README.md
```

---

## Documentación de la API

La documentación Swagger está disponible en `http://localhost:3001/api-docs` cuando el backend está en ejecución.

---

## Licencia

MIT

---
