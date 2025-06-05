# 🏋️ Gym Tracker

Aplicación web para el seguimiento de rutinas de ejercicios y progreso en el gimnasio.

## 🚀 Despliegue

La aplicación está desplegada en Netlify:  
🔗 [https://courageous-crisp-65ec22.netlify.app/](https://courageous-crisp-65ec22.netlify.app/)

## 🛠️ Configuración para desarrollo

### Requisitos
- Node.js >= 18.17.0
- npm >= 9.6.4

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/sergioAndresCastaneda/gym-tracker.git
   cd gym-tracker
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🏗️ Comandos útiles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run deploy` - Despliega en GitHub Pages

## ⚙️ Configuración de despliegue

### Netlify
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Environment variables:**
  - `NODE_VERSION`: 20.0.0
  - `NPM_VERSION`: 9.6.4
  - `NODE_OPTIONS`: --openssl-legacy-provider

## 🧩 Tecnologías utilizadas

- React 18
- Vite
- React Icons
- date-fns
- Netlify (despliegue)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Tracker App

Aplicación web para trackear tus actividades de gimnasio con un calendario interactivo y un dashboard visual.

## Características
- Calendario grande e interactivo para registrar ejercicios, series, repeticiones y pesos.
- Visualización elegante de tus registros en el calendario.
- Dashboard con estadísticas y gráficos interactivos basados en tus registros.
- Interfaz moderna, limpia y responsive.

## Tecnologías principales
- React + Vite
- react-big-calendar
- recharts

## Instalación
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia la app:
   ```bash
   npm run dev
   ```

## Estructura principal
- `src/App.jsx`: Componente principal y navegación.
- `src/components/Calendar.jsx`: Calendario y registro de actividades.
- `src/components/Dashboard.jsx`: Dashboard interactivo.

---
¡Personaliza y mejora la app según tus necesidades!
