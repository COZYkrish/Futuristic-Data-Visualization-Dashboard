import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer
} from "recharts"

export default function LineChartComponent({ data, xKey, yKey }) {
 return (
  <ResponsiveContainer width="100%" height={300}>
   <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={xKey} />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey={yKey} stroke="#22c55e" />
   </LineChart>
  </ResponsiveContainer>
 )
}