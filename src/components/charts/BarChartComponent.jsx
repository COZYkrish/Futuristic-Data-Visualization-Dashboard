import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer
} from "recharts"

export default function BarChartComponent({ data, xKey, yKey }) {
 return (
  <ResponsiveContainer width="100%" height={300}>
   <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={xKey} />
    <YAxis />
    <Tooltip />
    <Bar dataKey={yKey} fill="#06b6d4" />
   </BarChart>
  </ResponsiveContainer>
 )
}