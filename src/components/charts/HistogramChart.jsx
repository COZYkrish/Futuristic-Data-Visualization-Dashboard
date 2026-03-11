import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer
} from "recharts"

export default function HistogramChart({ data, column }) {

 const values = data.map(d => Number(d[column])).filter(v => !isNaN(v))

 const bins = 10
 const min = Math.min(...values)
 const max = Math.max(...values)
 const binSize = (max - min) / bins

 const histogram = Array.from({ length: bins }, (_, i) => ({
  bin: `${(min + i * binSize).toFixed(1)}`
 }))

 histogram.forEach((bin, i) => {
  const start = min + i * binSize
  const end = start + binSize

  bin.count = values.filter(v => v >= start && v < end).length
 })

 return (
  <ResponsiveContainer width="100%" height={300}>
   <BarChart data={histogram}>
    <XAxis dataKey="bin" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="count" fill="#f59e0b" />
   </BarChart>
  </ResponsiveContainer>
 )
}