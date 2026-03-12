import { useMemo } from "react"
import {
 ScatterChart,
 Scatter,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer,
 ZAxis,
 ReferenceLine
} from "recharts"
import { toNumericOrNull } from "../../utils/dataProfiling"

export default function ScatterChartComponent({ data, xKey, yKey }) {
 const points = useMemo(() => {
  if (!xKey || !yKey) return []

  return data
   .map((row, index) => {
    const x = toNumericOrNull(row[xKey])
    const y = toNumericOrNull(row[yKey])

    if (x === null || y === null) return null

    return {
     x,
     y,
     magnitude: Math.abs(y),
     label: `Row ${index + 1}`
    }
   })
   .filter(Boolean)
   .slice(0, 800)
 }, [data, xKey, yKey])

 const meanX = points.length
  ? points.reduce((sum, point) => sum + point.x, 0) / points.length
  : 0
 const meanY = points.length
  ? points.reduce((sum, point) => sum + point.y, 0) / points.length
  : 0

 if (!points.length) {
  return (
   <div className="flex h-[300px] items-center justify-center text-gray-400">
    Select numeric columns for both X and Y to render scatter signals.
   </div>
  )
 }

 return (
  <ResponsiveContainer width="100%" height={340}>
   <ScatterChart margin={{ top: 16, right: 20, bottom: 8, left: 0 }}>
    <CartesianGrid stroke="#334155" />
    <XAxis type="number" dataKey="x" name={xKey} tick={{ fill: "#cbd5e1", fontSize: 11 }} />
    <YAxis type="number" dataKey="y" name={yKey} tick={{ fill: "#cbd5e1", fontSize: 11 }} />
    <ZAxis type="number" dataKey="magnitude" range={[36, 180]} />
    <Tooltip
     cursor={{ strokeDasharray: "4 4" }}
     contentStyle={{ background: "#020617", border: "1px solid #8b5cf6", borderRadius: "10px" }}
    />
    <ReferenceLine x={meanX} stroke="#a78bfa" strokeDasharray="4 4" />
    <ReferenceLine y={meanY} stroke="#a78bfa" strokeDasharray="4 4" />
    <Scatter data={points} fill="#8b5cf6" />
   </ScatterChart>
  </ResponsiveContainer>
 )
}
