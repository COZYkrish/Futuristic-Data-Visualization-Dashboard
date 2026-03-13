import { useRef } from "react"

export default function DatasetUpload({
 onFileUpload,
 fileName,
 error,
 isUploading,
 rows,
 columns
}) {

 const fileRef = useRef()

 const handleUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
   onFileUpload(file)
  }
 }

 const statusLabel = isUploading
  ? "Processing dataset..."
  : fileName
   ? `Loaded ${fileName}`
   : "Choose a CSV file to start exploring your data."

 return (

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl space-y-4">

   <h2 className="text-cyan-400 text-lg mb-4">
    Upload Dataset
   </h2>

   <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div className="space-y-1">
     <p className="text-sm text-white">
      {statusLabel}
     </p>
     <p className="text-xs text-slate-400">
      Supports CSV files with header columns.
     </p>
    </div>

    <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/20">
     <span>{isUploading ? "Uploading..." : "Choose File"}</span>
     <input
      type="file"
      accept=".csv,text/csv"
      ref={fileRef}
      onChange={handleUpload}
      className="sr-only"
      disabled={isUploading}
     />
    </label>
   </div>

   <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
     <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">
      Dataset
     </span>
     <span className="mt-1 block truncate text-white">
      {fileName || "No dataset selected"}
     </span>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
     <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">
      Shape
     </span>
     <span className="mt-1 block text-white">
      {rows > 0 ? `${rows} rows x ${columns} columns` : "Waiting for upload"}
     </span>
    </div>
   </div>

   {error && (
    <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
     {error}
    </div>
   )}

  </div>
 )
}
