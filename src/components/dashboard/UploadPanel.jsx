import DatasetUpload from "../upload/DatasetUpload"

function formatPercent(value) {
 return `${Math.round(value * 100)}%`
}

export default function UploadPanel({
 onFileUpload,
 fileName,
 error,
 isUploading,
 summary
}) {
 const summaryTiles = [
  {
   label: "Completeness",
   value: summary.rows ? formatPercent(summary.completeness) : "Idle"
  },
  {
   label: "Primary Dimension",
   value: summary.primaryDimension || "Waiting"
  },
  {
   label: "Primary Metric",
   value: summary.primaryMetric || "Waiting"
  }
 ]

 return (
  <section
   id="upload-dataset"
   className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_24%),linear-gradient(135deg,_rgba(15,23,42,0.94),_rgba(2,6,23,0.98))] p-5 shadow-[0_0_60px_rgba(15,23,42,0.32)] sm:p-8"
  >
   <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
    <DatasetUpload
     onFileUpload={onFileUpload}
     fileName={fileName}
     error={error}
     isUploading={isUploading}
     rows={summary.rows}
     columns={summary.columns}
    />

    <div className="rounded-[24px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
     <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
      Ingestion Status
     </p>
     <h2 className="mt-3 text-2xl font-semibold text-white">
      {summary.status}
     </h2>
     <p className="mt-3 text-sm leading-7 text-slate-300">
      Keep the workflow centered here: upload a dataset, confirm structural health,
      then move into the charts or AI workspaces with the same in-memory data.
     </p>

     <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
      {summaryTiles.map((tile) => (
       <div
        key={tile.label}
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
       >
        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
         {tile.label}
        </p>
        <p className="mt-2 text-lg font-semibold text-white">
         {tile.value}
        </p>
       </div>
      ))}
     </div>
    </div>
   </div>
  </section>
 )
}
