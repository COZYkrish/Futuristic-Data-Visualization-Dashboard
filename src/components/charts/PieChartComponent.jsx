import {
 PieChart,
 Pie,
 Tooltip,
 Cell,
 ResponsiveContainer,
 Legend
} from "recharts"
import { useMemo } from "react"

const COLORS = ["#06b6d4", "#22c55e", "#f59e0b", "#ef4444"]

function buildPieData(data, categoryKey, valueKey) {
 const grouped = data.reduce((accumulator, row) => {
  const name = String(row[categoryKey] ?? "Unknown")
  const numericValue = Number(row[valueKey])

  if (!accumulator[name]) {
   accumulator[name] = { name, value: 0 }
  }

  accumulator[name].value += Number.isFinite(numericValue) ? numericValue : 1
  return accumulator
 }, {})

 return Object.values(grouped).filter((entry) => entry.value > 0)
}

export default function PieChartComponent({ data, categoryKey, valueKey }) {
 const pieData = useMemo(
  () => buildPieData(data, categoryKey, valueKey),
  [data, categoryKey, valueKey]
 )

 if (!categoryKey || !valueKey || pieData.length === 0) {
  return (
   <div className="flex h-[300px] items-center justify-center text-gray-400">
    Choose a category column and a value column to render the pie chart.
   </div>
  )
 }

 return (
  <ResponsiveContainer width="100%" height={300}>
   <PieChart>
    <Pie
     data={pieData}
     dataKey="value"
     nameKey="name"
     cx="50%"
     cy="50%"
     outerRadius={100}
     label
    >
     {pieData.map((entry, index) => (
      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
     ))}
    </Pie>
    <Tooltip />
    <Legend />
   </PieChart>
  </ResponsiveContainer>
 )
}
