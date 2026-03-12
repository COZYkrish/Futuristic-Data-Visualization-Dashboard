import { useMemo, useState } from "react"
import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer,
 Cell,
 Brush,
 ReferenceLine,
 Legend
} from "recharts"

export default function BarChartComponent({ data, xKey, yKey }) {
 const [activeIndex, setActiveIndex] = useState(null)

 const average = useMemo(() => {
  if (!data.length || !yKey) return 0
  const sum = data.reduce((acc, row) => acc + Number(row[yKey] || 0), 0)
  return sum / data.length
 }, [data, yKey])

 if (!xKey || !yKey || !data.length) {
  return <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">Insufficient data for bar chart.</div>
 }

 return (
  <ResponsiveContainer width="100%" height={340}>
   <BarChart data={data} margin={{ top: 16, right: 20, left: 0, bottom: 12 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
    <XAxis dataKey={xKey} tick={{ fill: "#cbd5e1", fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={56} />
    <YAxis tick={{ fill: "#cbd5e1", fontSize: 11 }} />
    <Tooltip
     contentStyle={{ background: "#020617", border: "1px solid #0ea5e9", borderRadius: "10px" }}
     labelStyle={{ color: "#e2e8f0" }}
    />
    <Legend />
    <ReferenceLine y={average} stroke="#22d3ee" strokeDasharray="6 4" label={{ value: "avg", fill: "#67e8f9", position: "right" }} />

    <Bar
     dataKey={yKey}
     radius={[8, 8, 0, 0]}
     onMouseOver={(_, index) => setActiveIndex(index)}
     onMouseLeave={() => setActiveIndex(null)}
    >
     {data.map((entry, index) => (
      <Cell
       key={`${entry[xKey]}-${index}`}
       fill={index === activeIndex ? "#67e8f9" : "#0891b2"}
      />
     ))}
    </Bar>

    {data.length > 8 && <Brush dataKey={xKey} height={18} stroke="#22d3ee" travellerWidth={8} />}
   </BarChart>
  </ResponsiveContainer>
 )
}
