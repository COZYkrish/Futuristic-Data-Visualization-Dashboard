import { useMemo } from "react"

import DatasetInsights from "../components/ai/DatasetInsights"
import ChartRecommendation from "../components/ai/ChartRecommendation"
import OutlierDetection from "../components/ai/OutlierDetection"
import CorrelationHeatmap from "../components/ai/CorrelationHeatmap"
import { buildColumnProfiles } from "../utils/dataProfiling"

function InsightMetric({ label, value, accent }) {
 return (
  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
   <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
    {label}
   </p>
   <p className={`mt-3 text-3xl font-semibold ${accent}`}>
    {value}
   </p>
  </div>
 )
}

function SignalCard({ title, description }) {
 return (
  <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
   <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
    {title}
   </h3>
   <p className="mt-3 text-sm leading-7 text-slate-300">
    {description}
   </p>
  </div>
 )
}

export default function AIInsights({ data, datasetName, uploadError }) {
 const overview = useMemo(() => {
  if (!data.length) {
   return {
    rows: 0,
    columns: 0,
    numeric: 0,
    quality: "Idle"
   }
  }

  const profile = buildColumnProfiles(data)
  const rows = data.length
  const columns = profile.columns.length
  const totalCells = rows * columns
  const missingValues = Object.values(profile.profiles).reduce(
   (sum, item) => sum + item.missing,
   0
  )
  const completeness = totalCells ? ((totalCells - missingValues) / totalCells) * 100 : 0

  return {
   rows,
   columns,
   numeric: profile.numericColumns.length,
   quality: `${Math.round(completeness)}%`
  }
 }, [data])

 const spotlightSignals = useMemo(() => {
  if (!data.length) {
   return [
    {
     title: "Dataset profiling",
     description: "Upload a dataset to compute completeness, structure balance, and signal coverage."
    },
    {
     title: "Anomaly scan",
     description: "Outlier detection activates when enough numeric observations are available."
    },
    {
     title: "Relationship map",
     description: "Correlation heatmaps appear once at least two numeric columns are present."
    }
   ]
  }

  return [
   {
    title: "Dataset profiling",
    description: `${overview.rows.toLocaleString()} rows and ${overview.columns} columns are available for scoring and structure analysis.`
   },
   {
    title: "Anomaly scan",
    description: `${overview.numeric} numeric columns are eligible for outlier detection using IQR boundaries.`
   },
   {
    title: "Relationship map",
    description: `${overview.numeric >= 2 ? "Correlation analysis is active." : "Add another numeric column to unlock correlation analysis."}`
   }
  ]
 }, [data.length, overview.columns, overview.numeric, overview.rows])

 return (
  <div className="w-full p-4 sm:p-6 lg:p-8">
   <div className="space-y-8">
    <section className="relative overflow-hidden rounded-[24px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-5 shadow-[0_0_80px_rgba(34,211,238,0.08)] sm:rounded-[30px] sm:p-8">
     <div className="relative z-10 grid gap-8 xl:grid-cols-[1.35fr_0.9fr]">
      <div className="space-y-4">
       <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-cyan-200">
        AI Observatory
       </span>
       <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Dedicated intelligence layer for your uploaded dataset
       </h1>
       <p className="max-w-2xl text-sm leading-7 text-slate-300">
        Surface quality signals, recommended chart modes, outlier clusters, and correlation
        structure in one focused analysis workspace with the same shared dataset state.
       </p>

       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InsightMetric label="Dataset" value={datasetName || "Waiting"} accent="text-cyan-200" />
        <InsightMetric label="Rows" value={overview.rows} accent="text-white" />
        <InsightMetric label="Numeric" value={overview.numeric} accent="text-emerald-300" />
        <InsightMetric label="Quality" value={overview.quality} accent="text-fuchsia-300" />
       </div>
      </div>

      <div className="rounded-[22px] border border-white/10 bg-black/30 p-5 backdrop-blur-xl sm:rounded-[26px] sm:p-6">
       <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
        Analysis Status
       </p>
       <h2 className="mt-3 text-2xl font-semibold text-white">
        {data.length ? "AI models primed" : "Awaiting dataset"}
       </h2>
       <p className="mt-3 text-sm leading-7 text-slate-300">
        {uploadError || (
         data.length
          ? `Profiling ${overview.columns} columns with automated heuristics for insight extraction.`
          : "Upload a CSV on the dashboard to activate the AI insights workspace."
        )}
       </p>
       <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4 text-sm text-slate-200">
        Signal stack: dataset profiling, chart recommendation, outlier detection, and correlation mapping.
       </div>
      </div>
     </div>
    </section>

    <section className="grid gap-6 xl:grid-cols-2">
      <DatasetInsights data={data} />
      <ChartRecommendation data={data} />
    </section>

    <section className="grid gap-6 lg:grid-cols-3">
      {spotlightSignals.map((signal) => (
       <SignalCard
        key={signal.title}
        title={signal.title}
        description={signal.description}
       />
      ))}
    </section>

    <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <OutlierDetection data={data} />
      <CorrelationHeatmap data={data} />
    </section>
   </div>
  </div>
 )
}
