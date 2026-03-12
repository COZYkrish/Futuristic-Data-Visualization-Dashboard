import { useMemo } from "react"
import { buildColumnProfiles } from "../../utils/dataProfiling"

function formatValue(value) {
 if (Math.abs(value) >= 1000) return value.toFixed(0)
 if (Math.abs(value) >= 100) return value.toFixed(1)
 return value.toFixed(2)
}

export default function DatasetInsights({ data }) {
 if (!data.length) return null

 const summary = useMemo(() => {
  const profile = buildColumnProfiles(data)
  const rows = data.length
  const columns = profile.columns.length
  const totalCells = rows * columns

  const missingValues = Object.values(profile.profiles).reduce(
   (sum, item) => sum + item.missing,
   0
  )

  const completeness = totalCells ? 1 - missingValues / totalCells : 0
  const qualityScore = Math.max(0, Math.min(100, Math.round(completeness * 100)))

  const strongestSignal = profile.numericColumns
   .map((column) => {
    const values = profile.profiles[column].numericValues
    if (!values.length) return null

    const mean = values.reduce((sum, value) => sum + value, 0) / values.length
    const variance =
     values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length
    const std = Math.sqrt(variance)
    const relative = mean !== 0 ? std / Math.abs(mean) : std

    return { column, mean, std, relative }
   })
   .filter(Boolean)
   .sort((left, right) => right.relative - left.relative)[0]

  return {
   rows,
   columns,
   numeric: profile.numericColumns.length,
   categorical: profile.categoricalColumns.length,
   missingValues,
   qualityScore,
   strongestSignal
  }
 }, [data])

 return (
  <div className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-6">
   <h2 className="mb-4 text-xl font-semibold text-cyan-300">
    AI Dataset Insights
   </h2>

   <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
    <div
     className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
     style={{ width: `${summary.qualityScore}%` }}
    />
   </div>

   <div className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
    <p>Rows processed: {summary.rows}</p>
    <p>Columns mapped: {summary.columns}</p>
    <p>Numeric signals: {summary.numeric}</p>
    <p>Categorical dimensions: {summary.categorical}</p>
    <p>Missing cells: {summary.missingValues}</p>
    <p>Data quality score: {summary.qualityScore}/100</p>
   </div>

   {summary.strongestSignal && (
    <p className="mt-4 rounded-lg border border-cyan-400/20 bg-black/20 p-3 text-sm text-cyan-100">
     Peak volatility signal detected on <span className="font-semibold">{summary.strongestSignal.column}</span>:
     mean {formatValue(summary.strongestSignal.mean)}, standard deviation {formatValue(summary.strongestSignal.std)}.
    </p>
   )}
  </div>
 )
}
