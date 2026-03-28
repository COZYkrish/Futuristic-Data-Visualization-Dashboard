import { useMemo } from "react"
import { buildColumnProfiles } from "../../utils/dataProfiling"

export default function ChartRecommendation({ data }) {
 const recommendation = useMemo(() => {
  if (!data.length) return null

//   const profile = buildColumnProfiles(data)

  const highCardinalityCategorical = profile.categoricalColumns.find(
   (column) => profile.profiles[column].distinctCount > 12
  )

  if (profile.numericColumns.length >= 2) {
   return {
    chart: "Scatter Plot + Correlation Heatmap",
    confidence: "High",
    reason: "Multiple numeric signals were detected, so relationship and clustering patterns are likely meaningful."
   }
  }

  if (highCardinalityCategorical && profile.numericColumns.length >= 1) {
   return {
    chart: "Line Chart with aggregation",
    confidence: "Medium",
    reason: `Column ${highCardinalityCategorical} has many categories; trend view will stay readable with top-N filtering.`
   }
  }

  if (profile.categoricalColumns.length >= 1 && profile.numericColumns.length >= 1) {
   return {
    chart: "Bar / Pie Chart",
    confidence: "Medium",
    reason: "A categorical-to-numeric shape is present, which is ideal for ranked comparisons or composition views."
   }
  }

  return {
   chart: "Histogram",
   confidence: "Baseline",
   reason: "Numeric structure is limited, so distribution analysis is the safest first step."
  }
 }, [data])

 if (!recommendation) return null

 return (
  <div className="rounded-xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 via-cyan-500/5 to-transparent p-6">
   <h2 className="mb-4 text-xl font-semibold text-fuchsia-300">
    AI Chart Recommendation
   </h2>

   <p className="text-sm text-slate-100">
    Suggested mode: <span className="font-semibold text-fuchsia-200">{recommendation.chart}</span>
   </p>
   <p className="mt-2 text-xs uppercase tracking-wide text-fuchsia-200/80">
    Confidence: {recommendation.confidence}
   </p>
   <p className="mt-3 text-sm text-slate-300">
    {recommendation.reason}
   </p>
  </div>
 )
}
