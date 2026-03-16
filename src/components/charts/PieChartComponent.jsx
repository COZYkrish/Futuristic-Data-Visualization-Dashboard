import {
 PieChart,
 Pie,
 Tooltip,
 Cell,
 ResponsiveContainer,
 Legend,
 Sector
} from "recharts"
import { useMemo, useState } from "react"

const COLORS = ["#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#a78bfa", "#14b8a6"]

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

// function renderActiveShape(props) {
//  const {
//   cx,
//   cy,
//   innerRadius,
//   outerRadius,
//   startAngle,
//   endAngle,
//   fill,
//   payload,
//   percent
//  } = props

 return (
  <g>
   <Sector
    cx={cx}
    cy={cy}
    innerRadius={innerRadius}
    outerRadius={outerRadius + 10}
    startAngle={startAngle}
    endAngle={endAngle}
    fill={fill}
   />
   <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#e2e8f0" fontSize={12}>
    {payload.name}
   </text>
   <text x={cx} y={cy + 22} textAnchor="middle" fill="#67e8f9" fontSize={11}>
    {(percent * 100).toFixed(1)}%
   </text>
  </g>
 )
}

export default function PieChartComponent({ data, categoryKey, valueKey }) {
 const [activeIndex, setActiveIndex] = useState(0)

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
  <ResponsiveContainer width="100%" height={340}>
   <PieChart>
    <Pie
     data={pieData}
     dataKey="value"
     nameKey="name"
     cx="50%"
     cy="50%"
     innerRadius={56}
     outerRadius={108}
     activeIndex={activeIndex}
     activeShape={renderActiveShape}
     onMouseEnter={(_, index) => setActiveIndex(index)}
     paddingAngle={2}
    >
     {pieData.map((entry, index) => (
      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
     ))}
    </Pie>
    <Tooltip
     formatter={(value) => [Number(value).toLocaleString(), valueKey]}
     contentStyle={{ background: "#020617", border: "1px solid #06b6d4", borderRadius: "10px" }}
    />
    <Legend />
   </PieChart>
  </ResponsiveContainer>
 )
}
