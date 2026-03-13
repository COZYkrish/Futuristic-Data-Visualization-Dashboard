import { toNumericOrNull } from "./dataProfiling"

export function aggregateChartData(data, xKey, yKey, aggregation, sortMode, topN) {
 if (!xKey || !yKey || !data.length) return []

 const grouped = data.reduce((accumulator, row) => {
  const category = String(row[xKey] ?? "Unknown")
  const numeric = toNumericOrNull(row[yKey])

  if (!accumulator[category]) {
   accumulator[category] = {
    [xKey]: category,
    value: 0,
    count: 0,
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY
   }
  }

  const entry = accumulator[category]

  if (numeric !== null) {
   entry.value += numeric
   entry.count += 1
   entry.min = Math.min(entry.min, numeric)
   entry.max = Math.max(entry.max, numeric)
  } else if (aggregation === "count") {
   entry.count += 1
  }

  return accumulator
 }, {})

 const result = Object.values(grouped).map((entry) => {
  let computed = entry.value

  if (aggregation === "avg") {
   computed = entry.count ? entry.value / entry.count : 0
  }

  if (aggregation === "count") {
   computed = entry.count
  }

  if (aggregation === "min") {
   computed = Number.isFinite(entry.min) ? entry.min : 0
  }

  if (aggregation === "max") {
   computed = Number.isFinite(entry.max) ? entry.max : 0
  }

  return {
   [xKey]: entry[xKey],
   [yKey]: Number(computed.toFixed(4))
  }
 })

 const sorted = [...result].sort((left, right) =>
  sortMode === "asc" ? left[yKey] - right[yKey] : right[yKey] - left[yKey]
 )

 return sorted.slice(0, topN)
}
