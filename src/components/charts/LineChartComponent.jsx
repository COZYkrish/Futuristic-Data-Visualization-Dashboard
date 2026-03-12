import { useMemo, useState } from "react"
import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer,
 Brush,
 ReferenceLine,
 Legend
} from "recharts"

export default function LineChartComponent({ data, xKey, yKey }) {
 const [activeDotIndex, setActiveDotIndex] = useState(null)

 const average = useMemo(() => {
  if (!data.length || !yKey) return 0
  const sum = data.reduce((acc, row) => acc + Number(row[yKey] || 0), 0)
  return sum / data.length
 }, [data, yKey])

 if (!xKey || !yKey || !data.length) {
  return <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">Insufficient data for line chart.</div>
 }

 return (
  <ResponsiveContainer width="100%" height={340}>
   <LineChart data={data} margin={{ top: 16, right: 20, left: 0, bottom: 12 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
    <XAxis dataKey={xKey} tick={{ fill: "#cbd5e1", fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={56} />
    <YAxis tick={{ fill: "#cbd5e1", fontSize: 11 }} />
    <Tooltip
     contentStyle={{ background: "#020617", border: "1px solid #22c55e", borderRadius: "10px" }}
     labelStyle={{ color: "#e2e8f0" }}
    />
    <Legend />
    <ReferenceLine y={average} stroke="#34d399" strokeDasharray="6 4" label={{ value: "avg", fill: "#6ee7b7", position: "right" }} />
    <Line
     type="monotone"
     dataKey={yKey}
     stroke="#22c55e"
     strokeWidth={3}
     dot={{ r: 3, fill: "#10b981" }}
     activeDot={{ r: 6, fill: "#86efac" }}
     onMouseMove={(_, index) => setActiveDotIndex(index)}
     onMouseLeave={() => setActiveDotIndex(null)}
    />
    {activeDotIndex !== null && (
     <ReferenceLine
      x={data[activeDotIndex]?.[xKey]}
      stroke="#4ade80"
      strokeDasharray="4 4"
     />
    )}

    {data.length > 8 && <Brush dataKey={xKey} height={18} stroke="#22c55e" travellerWidth={8} />}
   </LineChart>
  </ResponsiveContainer>
 )
}
