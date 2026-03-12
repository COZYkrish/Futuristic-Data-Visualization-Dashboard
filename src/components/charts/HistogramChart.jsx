import { useMemo } from "react"
import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
 CartesianGrid
} from "recharts"
import { toNumericOrNull } from "../../utils/dataProfiling"

export default function HistogramChart({ data, column }) {
 const histogram = useMemo(() => {
  if (!column) return []

  const values = data
   .map((row) => toNumericOrNull(row[column]))
   .filter((value) => value !== null)

  if (values.length < 2) return []

  const min = Math.min(...values)
  const max = Math.max(...values)

  if (min === max) {
   return [{ bin: `${min.toFixed(2)}`, count: values.length }]
  }

  const bins = Math.max(6, Math.min(20, Math.round(Math.sqrt(values.length))))
  const size = (max - min) / bins

  const built = Array.from({ length: bins }, (_, index) => {
   const start = min + index * size
   const end = index === bins - 1 ? max : start + size

   return {
    bin: `${start.toFixed(1)}-${end.toFixed(1)}`,
    count: 0,
    start,
    end
   }
  })

  values.forEach((value) => {
   const normalized = Math.min(bins - 1, Math.floor((value - min) / size))
   built[normalized].count += 1
  })

  return built
 }, [column, data])

 if (!column || !histogram.length) {
  return (
   <div className="flex h-[300px] items-center justify-center text-gray-400">
    Select a numeric column with sufficient values to render histogram.
   </div>
  )
 }

 return (
  <ResponsiveContainer width="100%" height={340}>
   <BarChart data={histogram} margin={{ top: 16, right: 20, left: 0, bottom: 12 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
    <XAxis dataKey="bin" tick={{ fill: "#cbd5e1", fontSize: 10 }} interval={0} angle={-18} textAnchor="end" height={64} />
    <YAxis tick={{ fill: "#cbd5e1", fontSize: 11 }} />
    <Tooltip
     formatter={(value) => [value, "count"]}
     contentStyle={{ background: "#020617", border: "1px solid #f59e0b", borderRadius: "10px" }}
    />
    <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
   </BarChart>
  </ResponsiveContainer>
 )
}
