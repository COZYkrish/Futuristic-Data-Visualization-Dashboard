import { useMemo } from "react"
import { buildColumnProfiles } from "../../utils/dataProfiling"

function quartile(sortedValues, q) {
 const position = (sortedValues.length - 1) * q
 const base = Math.floor(position)
 const rest = position - base

 if (sortedValues[base + 1] !== undefined) {
  return sortedValues[base] + rest * (sortedValues[base + 1] - sortedValues[base])
 }

 return sortedValues[base]
}

export default function OutlierDetection({ data }) {
 if (!data.length) return null

 const summary = useMemo(() => {
  const profile = buildColumnProfiles(data)
  const flagged = []

  profile.numericColumns.forEach((column) => {
   const values = profile.profiles[column].numericValues
   if (values.length < 8) return

   const sorted = [...values].sort((left, right) => left - right)
   const q1 = quartile(sorted, 0.25)
   const q3 = quartile(sorted, 0.75)
   const iqr = q3 - q1

   if (iqr === 0) return

   const lower = q1 - 1.5 * iqr
   const upper = q3 + 1.5 * iqr

   values.forEach((value) => {
    if (value < lower || value > upper) {
     flagged.push({ column, value })
    }
   })
  })

  return {
   count: flagged.length,
   samples: flagged.slice(0, 4)
  }
 }, [data])

 return (
  <div className="rounded-xl border border-red-400/20 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent p-6">
   <h2 className="mb-4 text-xl font-semibold text-rose-300">
    Outlier Detection
   </h2>

   <p className="text-sm text-slate-200">
    Found <span className="font-semibold text-rose-200">{summary.count}</span> potential outliers using IQR boundaries.
   </p>

   {summary.samples.length > 0 && (
    <div className="mt-3 space-y-1 text-xs text-rose-100/90">
     {summary.samples.map((sample, index) => (
      <p key={`${sample.column}-${sample.value}-${index}`}>
       {sample.column}: {sample.value.toFixed(3)}
      </p>
     ))}
    </div>
   )}
  </div>
 )
}
