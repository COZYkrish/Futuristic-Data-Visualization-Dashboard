# Futuristic Data Visualization Dashboard

A modern React dashboard for exploring CSV datasets through interactive 2D/3D charts, animated UI components, and AI-assisted analytics.

## Live Demo

Production deployment: [futuristic-data-visualization-dashb.vercel.app](https://futuristic-data-visualization-dashb.vercel.app)

## Key Features

- CSV upload and parsing workflow
- Automatic data profiling (rows, columns, missing values)
- Interactive charting with multiple visualization types:
  - Bar
  - Line
  - Pie
  - Scatter
  - Histogram
  - 3D chart (Three.js / React Three Fiber)
- Chart controls for axis selection, aggregation, sorting, and Top-N filtering
- AI analytics panels:
  - Dataset insights
  - Correlation heatmap
  - Outlier detection
  - Chart recommendations
- Futuristic UI design with motion and visual effects

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Recharts
- Three.js + React Three Fiber + Drei
- Framer Motion
- Papa Parse
- ESLint

## Getting Started

### Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Start Vite development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint checks

## Build and Deploy

1. Create a production build:

```bash
npm run build
```

2. Deploy the generated `dist/` folder using your preferred hosting platform (Vercel recommended for this project).

## Project Structure

```text
futuristic-dashboard/
+- public/
+- src/
|  +- api/
|  +- assets/
|  +- components/
|  |  +- ai/
|  |  +- charts/
|  |  +- dashboard/
|  |  +- layout/
|  |  +- ui/
|  |  +- upload/
|  +- pages/
|  |  +- Dashboard.jsx
|  +- styles/
|  +- utils/
|  +- App.jsx
|  +- main.jsx
+- index.html
+- package.json
+- vite.config.js
+- README.md
```
