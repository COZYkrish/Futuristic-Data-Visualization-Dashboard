import {
 ScatterChart,
 Scatter,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer
} from "recharts"

export default function ScatterChartComponent({ data, xKey, yKey }) {

 return (
  <ResponsiveContainer width="100%" height={300}>
   <ScatterChart>
    <CartesianGrid />
    <XAxis dataKey={xKey} />
    <YAxis dataKey={yKey} />
    <Tooltip />
    <Scatter data={data} fill="#8b5cf6" />
   </ScatterChart>
  </ResponsiveContainer>
 )
}