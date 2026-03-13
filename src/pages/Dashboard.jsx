import { useEffect } from "react"

import StatsCard from "../components/dashboard/StatsCard"
import DatasetUpload from "../components/upload/DatasetUpload"
import DataTable from "../components/dashboard/DataTable"
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

 const rows = data.length
 const columns = data.length > 0 ? Object.keys(data[0]).length : 0

 const missingValues = data.reduce((total, row) => {
  return total + Object.values(row).filter(
   value => value === "" || value === null || value === undefined
  ).length
 }, 0)

 return (

  <div id="dashboard" className="w-full space-y-8 p-4 sm:p-6 lg:p-8">

   {/* Upload Section */}

   <section id="upload-dataset">
    <DatasetUpload
     onFileUpload={onFileUpload}
     fileName={datasetName}
     error={uploadError}
     isUploading={isUploading}
     rows={rows}
     columns={columns}
    />
   </section>

   {/* Stats Section */}

   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

    <StatsCard title="Rows" value={rows} />
    <StatsCard title="Columns" value={columns} />
    <StatsCard title="Missing Values" value={missingValues} />

   </div>

   {/* Dataset Preview */}

   <DataTable data={data} />

   <section className="rounded-[24px] border border-cyan-400/15 bg-gradient-to-br from-cyan-500/10 via-slate-950/80 to-fuchsia-500/10 p-5 shadow-[0_0_60px_rgba(34,211,238,0.08)] sm:rounded-[28px] sm:p-8">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
     <div className="max-w-2xl space-y-4">
      <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
       Visualization Deck
      </span>
      <div className="space-y-3">
       <h2 className="text-2xl font-semibold text-white sm:text-3xl">
        Launch a dedicated charts workspace for deeper exploration
       </h2>
       <p className="text-sm leading-7 text-slate-300">
        Switch to the charts page to compare visualization modes, tune aggregation,
        and inspect numeric versus categorical signals without losing your uploaded dataset.
       </p>
      </div>
     </div>

     <button
      type="button"
      onClick={onChartsNavigate}
      className="inline-flex w-full items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-400/15 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-400/25 lg:w-fit"
     >
      Open Charts Page
     </button>
    </div>
   </section>

   <section
    id="ai-insights"
    className="rounded-[24px] border border-fuchsia-400/15 bg-[radial-gradient(circle_at_top_right,_rgba(217,70,239,0.16),_transparent_26%),linear-gradient(135deg,_rgba(17,24,39,0.94),_rgba(2,6,23,0.98))] p-5 shadow-[0_0_60px_rgba(217,70,239,0.08)] sm:rounded-[28px] sm:p-8"
   >
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
     <div className="max-w-2xl space-y-4">
      <span className="inline-flex rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-fuchsia-200">
       AI Observatory
      </span>
      <div className="space-y-3">
       <h2 className="text-2xl font-semibold text-white sm:text-3xl">
        Review intelligent dataset diagnostics on a focused page
       </h2>
       <p className="text-sm leading-7 text-slate-300">
        Open the AI insights page for quality scoring, chart recommendations,
        outlier detection, and correlation mapping driven by the same uploaded dataset.
       </p>
      </div>
     </div>

     <button
      type="button"
      onClick={onAIInsightsNavigate}
      className="inline-flex w-full items-center justify-center rounded-2xl border border-fuchsia-300/40 bg-fuchsia-400/15 px-5 py-3 text-sm font-medium text-fuchsia-100 transition hover:border-fuchsia-200 hover:bg-fuchsia-400/25 lg:w-fit"
     >
      Open AI Insights
     </button>
    </div>
   </section>

  </div>

 )
}
