import { useEffect, useMemo } from "react"

import ChartCard from "../components/dashboard/ChartCard"
import StatsCard from "../components/dashboard/StatsCard"
import UploadPanel from "../components/dashboard/UploadPanel"
import DataTable from "../components/dashboard/DataTable"
import { summarizeDataset } from "../utils/dashboardSummary"
export default function Dashboard({
 data,
 datasetName,
 uploadError,
 isUploading,
 onFileUpload,
 focusTarget,
 onChartsNavigate,
 onAIInsightsNavigate
}) {

 useEffect(() => {
  const targetId = focusTarget === "top" ? "dashboard" : focusTarget
  const target = document.getElementById(targetId)

  if (!target) return

  target.scrollIntoView({
   behavior: "smooth",
   block: "start"
  })
 }, [focusTarget])

 const summary = useMemo(
  () => summarizeDataset(data, datasetName),
  [data, datasetName]
 )

 return (

  <div id="dashboard" className="w-full space-y-8 p-4 sm:p-6 lg:p-8">
   <section className="relative overflow-hidden rounded-[30px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.16),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-5 shadow-[0_0_80px_rgba(34,211,238,0.08)] sm:p-8">
    <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
     <div className="space-y-5">
      <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-cyan-200">
       Command Deck
      </span>

      <div className="space-y-3">
       <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Turn uploaded CSV files into a readable analysis workflow
       </h1>
       <p className="max-w-2xl text-sm leading-7 text-slate-300">
        The dashboard now follows a clearer order: ingest data, validate quality,
        inspect structure, then branch into charts or AI diagnostics.
       </p>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-slate-200">
       <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1">
        {summary.datasetName || "No dataset loaded"}
       </span>
       <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
        {summary.rows.toLocaleString()} rows
       </span>
       <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
        {summary.columns} columns
       </span>
       <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
        Quality {summary.qualityScore}%
       </span>
      </div>
     </div>

     <div className="rounded-[26px] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
       Dataset State
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
       {summary.status}
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">
       {summary.rows
        ? `${summary.populatedCells.toLocaleString()} populated cells are available for dashboard, charts, and AI views.`
        : "Upload a CSV file to activate the dashboard and unlock interactive exploration."}
      </p>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
       <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 transition-all"
        style={{ width: `${summary.qualityScore}%` }}
       />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
       <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
         Primary Dimension
        </p>
        <p className="mt-2 text-lg font-semibold text-white">
         {summary.primaryDimension || "Waiting"}
        </p>
       </div>
       <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
         Primary Metric
        </p>
        <p className="mt-2 text-lg font-semibold text-white">
         {summary.primaryMetric || "Waiting"}
        </p>
       </div>
      </div>
     </div>
    </div>
   </section>

   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
    <StatsCard
     title="Rows"
     value={summary.rows}
     description="Records available for the entire dashboard pipeline."
     accent="cyan"
    />
    <StatsCard
     title="Columns"
     value={summary.columns}
     description="Fields detected from the uploaded CSV header."
     accent="emerald"
    />
    <StatsCard
     title="Missing Values"
     value={summary.missingValues}
     description="Blank cells that may affect charts and AI quality scoring."
     accent="fuchsia"
    />
   </div>

   <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
    <StatsCard
     title="Quality Score"
     value={summary.qualityScore}
     description="Dataset completeness translated into a quick health signal."
     accent="amber"
    />
    <StatsCard
     title="Numeric Signals"
     value={summary.numericColumns}
     description="Columns ready for metrics, aggregations, and outlier analysis."
     accent="cyan"
    />
    <StatsCard
     title="Categorical Dimensions"
     value={summary.categoricalColumns}
     description="Columns suited for grouping, segmentation, and comparison."
     accent="emerald"
    />
   </section>

   <UploadPanel
    onFileUpload={onFileUpload}
    fileName={datasetName}
    error={uploadError}
    isUploading={isUploading}
    summary={summary}
   />

   <DataTable data={data} />

   <div className="grid gap-6 xl:grid-cols-2">
    <ChartCard
     badge="Visualization Deck"
     title="Launch a dedicated charts workspace for deeper exploration"
     description="Switch to the charts page to compare visualization modes, tune aggregation, and inspect numeric versus categorical signals without losing your uploaded dataset."
     metrics={[
      `${summary.numericColumns} numeric signals`,
      `${summary.categoricalColumns} categorical dimensions`,
      `${summary.rows.toLocaleString()} rows available`
     ]}
     buttonLabel="Open Charts Page"
     onClick={onChartsNavigate}
     accent="cyan"
    />

    <div id="ai-insights">
     <ChartCard
      badge="AI Observatory"
      title="Review intelligent dataset diagnostics on a focused page"
      description="Open the AI insights page for quality scoring, chart recommendations, outlier detection, and correlation mapping driven by the same uploaded dataset."
      metrics={[
       `Quality ${summary.qualityScore}%`,
       `${summary.missingValues} missing values`,
       summary.primaryMetric || "Awaiting primary metric"
      ]}
      buttonLabel="Open AI Insights"
      onClick={onAIInsightsNavigate}
      accent="fuchsia"
     />
    </div>
   </div>

  </div>

 )
}
