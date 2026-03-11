import {
 PieChart,
 Pie,
 Tooltip,
 Cell,
 ResponsiveContainer
} from "recharts"

const COLORS = ["#06b6d4", "#22c55e", "#f59e0b", "#ef4444"]

export default function PieChartComponent({ data, dataKey }) {

 return (
  <ResponsiveContainer width="100%" height={300}>
   <PieChart>
    <Pie
     data={data}
     dataKey={dataKey}
     nameKey="name"
     outerRadius={100}
     label
    >
     {data.map((entry, index) => (
      <Cell key={index} fill={COLORS[index % COLORS.length]} />
     ))}
    </Pie>
    <Tooltip />
   </PieChart>
  </ResponsiveContainer>
 )
}