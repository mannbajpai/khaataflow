# KhaataFlow Frontend

A modern React frontend for the KhaataFlow expense management application, built with Vite for fast development and optimized production builds.

## Features

- **React 18** with modern hooks and functional components
- **Vite** for lightning-fast development and building
- **Tailwind CSS** and **DaisyUI** for beautiful, responsive styling
- **React Router** for client-side routing
- **Axios** for API communication
- **Chart.js** for expense visualization
- **React Toastify** for notifications

## Quick Start

The easiest way to run the frontend is using Docker Compose from the project root:

```bash
docker-compose up --build
```

The frontend will be available at `http://localhost:5173`

## Manual Development Setup

For development without Docker:

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

4. Build for production:

```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run tests with Vitest
- `npm run lint` - Run ESLint for code quality

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Chart.js + react-chartjs-2** - Data visualization
- **React Toastify** - Toast notifications
- **Vitest** - Testing framework
- **React Testing Library** - Testing utilities
