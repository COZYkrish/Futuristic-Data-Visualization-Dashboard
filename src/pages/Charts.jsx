import { useEffect, useMemo, useState } from "react"

import ChartSelector from "../components/charts/ChartSelector"
import BarChartComponent from "../components/charts/BarChartComponent"
import LineChartComponent from "../components/charts/LineChartComponent"
import PieChartComponent from "../components/charts/PieChartComponent"
import ScatterChartComponent from "../components/charts/ScatterChartComponent"
import HistogramChart from "../components/charts/HistogramChart"
import ThreeDChart from "../components/charts/ThreeDChart"
import ChartRecommendation from "../components/ai/ChartRecommendation"
import { aggregateChartData } from "../utils/chartData"
import { buildColumnProfiles } from "../utils/dataProfiling"

function InsightPill({ label, value }) {
 return (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
   <span className="block text-[11px] uppercase tracking-[0.28em] text-slate-500">
    {label}
   </span>
   <span className="mt-2 block text-xl font-semibold text-white">
    {value}
   </span>
  </div>
 )
}

export default function Charts({ data, datasetName, uploadError }) {
 const [chartType, setChartType] = useState("bar")
 const [xKey, setXKey] = useState("")
 const [yKey, setYKey] = useState("")
 const [aggregation, setAggregation] = useState("sum")
 const [sortMode, setSortMode] = useState("desc")
 const [topN, setTopN] = useState(12)

 const profile = useMemo(() => buildColumnProfiles(data), [data])
 const columnNames = profile.columns
 const numericColumnNames = profile.numericColumns

 const xOptions = useMemo(() => {
  if (chartType === "scatter" || chartType === "histogram") {
   return numericColumnNames.length ? numericColumnNames : columnNames
  }

  return columnNames
 }, [chartType, columnNames, numericColumnNames])

 const yOptions = useMemo(() => {
  if (chartType === "histogram") return []

  return numericColumnNames.length ? numericColumnNames : columnNames
 }, [chartType, columnNames, numericColumnNames])

 useEffect(() => {
  if (columnNames.length === 0) {
   setXKey("")
   setYKey("")
   return
  }

  setXKey((current) => (
   current && xOptions.includes(current) ? current : xOptions[0]
  ))

  setYKey((current) => {
   if (chartType === "histogram") return ""
   if (current && yOptions.includes(current)) return current

   const fallbackNumeric = yOptions.find((column) => column !== xOptions[0])
   return fallbackNumeric ?? yOptions[0] ?? ""
  })
 }, [chartType, columnNames, xOptions, yOptions])

 const transformedData = useMemo(() => {
  if (chartType === "bar" || chartType === "line" || chartType === "pie") {
   return aggregateChartData(data, xKey, yKey, aggregation, sortMode, topN)
  }

  return data
 }, [aggregation, chartType, data, sortMode, topN, xKey, yKey])

 const chartSummary = useMemo(() => {
  if (!data.length) {
   return {
    title: "No active dataset",
    subtitle: "Upload a CSV from the dashboard to unlock chart analysis.",
    signalCount: 0,
    dimensionCount: 0
   }
  }

  return {
   title: datasetName || "Uploaded dataset",
   subtitle: `Rendering ${chartType.toUpperCase()} mode with ${data.length.toLocaleString()} rows in memory.`,
   signalCount: numericColumnNames.length,
   dimensionCount: profile.categoricalColumns.length
  }
 }, [chartType, data.length, datasetName, numericColumnNames.length, profile.categoricalColumns.length])

 const renderChart = () => {
  if (chartType === "bar") {
   return <BarChartComponent data={transformedData} xKey={xKey} yKey={yKey} />
  }

  if (chartType === "line") {
   return <LineChartComponent data={transformedData} xKey={xKey} yKey={yKey} />
  }

  if (chartType === "pie") {
   return <PieChartComponent data={transformedData} categoryKey={xKey} valueKey={yKey} />
  }

  if (chartType === "scatter") {
   return <ScatterChartComponent data={data} xKey={xKey} yKey={yKey} />
  }

  if (chartType === "histogram") {
   return <HistogramChart data={data} column={xKey} />
  }

  return <ThreeDChart data={data} xKey={xKey} yKey={yKey} />
 }

 return (
  <div className="w-full p-4 sm:p-6 lg:p-8">
   <div className="space-y-8">
    <section className="relative overflow-hidden rounded-[24px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.18),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(2,6,23,0.96))] p-5 shadow-[0_0_80px_rgba(56,189,248,0.08)] sm:rounded-[30px] sm:p-8">
     <div className="relative z-10 grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
      <div className="space-y-6">
       <div className="space-y-3">
        <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-cyan-200">
         Charts Lab
        </span>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
         Futuristic chart workspace for live dataset exploration
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-300">
         Tune dimensions, aggregation, and chart families in a dedicated view built for rapid
         comparison. The uploaded dataset stays shared with the dashboard.
        </p>
       </div>

       <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <InsightPill label="Dataset" value={datasetName || "Waiting"} />
        <InsightPill label="Numeric Signals" value={chartSummary.signalCount} />
        <InsightPill label="Dimensions" value={chartSummary.dimensionCount} />
       </div>
      </div>

      <div className="rounded-[22px] border border-white/10 bg-black/30 p-5 backdrop-blur-xl sm:rounded-[26px] sm:p-6">
       <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
        Active Render
       </p>
       <h2 className="mt-3 text-2xl font-semibold text-white">
        {chartSummary.title}
       </h2>
       <p className="mt-3 text-sm leading-7 text-slate-300">
        {uploadError || chartSummary.subtitle}
       </p>
       <div className="mt-6 h-px bg-gradient-to-r from-cyan-400/40 via-white/10 to-transparent" />
       <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1">
         Mode: {chartType.toUpperCase()}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
         X: {xKey || "Not selected"}
        </span>
        {chartType !== "histogram" && (
         <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          Y: {yKey || "Not selected"}
         </span>
        )}
       </div>
      </div>
     </div>
    </section>

    <section className="grid gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
     <aside className="space-y-6 rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-[28px] sm:p-6">
      <div className="space-y-2">
       <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
        Control Matrix
       </p>
       <h2 className="text-xl font-semibold text-white sm:text-2xl">
        Configure the render pipeline
       </h2>
      </div>

      <ChartSelector chartType={chartType} setChartType={setChartType} />

      <div className="space-y-4">
       <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">
         Category / X Axis
        </span>
        <select
         value={xKey}
         onChange={(event) => setXKey(event.target.value)}
         className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
        >
         {xOptions.map((column) => (
          <option key={column} value={column} className="bg-slate-950">
           {column}
          </option>
         ))}
        </select>
       </label>

       {chartType !== "histogram" && (
        <label className="block space-y-2">
         <span className="text-sm font-medium text-slate-300">
          Value / Y Axis
         </span>
         <select
          value={yKey}
          onChange={(event) => setYKey(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
         >
          {yOptions.map((column) => (
           <option key={column} value={column} className="bg-slate-950">
            {column}
           </option>
          ))}
         </select>
        </label>
       )}

       {(chartType === "bar" || chartType === "line" || chartType === "pie") && (
        <>
         <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">
           Aggregation
          </span>
          <select
           value={aggregation}
           onChange={(event) => setAggregation(event.target.value)}
           className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
          >
           <option value="sum" className="bg-slate-950">Sum</option>
           <option value="avg" className="bg-slate-950">Average</option>
           <option value="count" className="bg-slate-950">Count</option>
           <option value="min" className="bg-slate-950">Minimum</option>
           <option value="max" className="bg-slate-950">Maximum</option>
          </select>
         </label>

         <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">
           Sort Priority
          </span>
          <select
           value={sortMode}
           onChange={(event) => setSortMode(event.target.value)}
           className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
          >
           <option value="desc" className="bg-slate-950">Highest First</option>
           <option value="asc" className="bg-slate-950">Lowest First</option>
          </select>
         </label>

         <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
           <span>Top Categories</span>
           <span>{topN}</span>
          </div>
          <input
           type="range"
           min="5"
           max="50"
           step="1"
           value={topN}
           onChange={(event) => setTopN(Number(event.target.value))}
           className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-cyan-400"
          />
         </div>
        </>
       )}
      </div>
     </aside>

     <div className="space-y-6">
      <section className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-[0_0_40px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:rounded-[28px] sm:p-6">
       <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
         <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Render Output
         </p>
         <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
          {chartType.toUpperCase()} visual
         </h2>
        </div>
        <p className="text-sm text-slate-400">
         {data.length
          ? `${data.length.toLocaleString()} rows ready for exploration`
          : "Upload a dataset from the dashboard first"}
        </p>
       </div>

       <div className="min-h-[320px] rounded-[20px] border border-cyan-400/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.82))] p-3 sm:min-h-[420px] sm:rounded-[24px] sm:p-6">
        {renderChart()}
       </div>
      </section>

      <ChartRecommendation data={data} />
     </div>
    </section>
   </div>
  </div>
 )
}
