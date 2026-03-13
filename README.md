# Futuristic Data Visualization Dashboard

An interactive analytics dashboard for exploring CSV data with modern charts, 3D visuals, and AI-powered insights.

[Live Demo](https://futuristic-data-visualization-dashb.vercel.app) | React + Vite + Tailwind + Three.js

## Why This Project

This app helps you go from raw CSV to clear insights in minutes.  
Upload a dataset, choose chart dimensions, and instantly explore trends, relationships, and anomalies.

## Highlights

- Fast CSV upload and parsing
- Smart dataset summary: rows, columns, missing values
- Multiple visualization modes: Bar, Line, Pie, Scatter, Histogram, 3D
- Flexible chart controls: axes, aggregation, sorting, Top-N
- AI insight modules: recommendations, outliers, correlations, summary cards
- Futuristic UI with motion-rich interactions

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Recharts
- Three.js, React Three Fiber, Drei
- Framer Motion
- Papa Parse
- ESLint

## Quick Start

### 1) Install

```bash
npm install
```

### 2) Run

```bash
npm run dev
```

Open `http://localhost:5173` (or the URL shown in your terminal).

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run lint checks

## Deployment

The project is deployed on Vercel:  
[https://futuristic-data-visualization-dashb.vercel.app](https://futuristic-data-visualization-dashb.vercel.app)

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
