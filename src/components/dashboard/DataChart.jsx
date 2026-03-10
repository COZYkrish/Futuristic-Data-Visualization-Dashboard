import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

export default function DataChart({ data }) {

 if (data.length === 0) return null

 const counts = {}

 data.forEach(item => {
  const type = item.type
  counts[type] = (counts[type] || 0) + 1
 })

 const chartData = Object.keys(counts).map(key => ({
  name: key,
  value: counts[key]
 }))

 return (

  <div className="bg-white/5 border border-white/10 p-6 rounded-xl">

   <h2 className="text-cyan-400 mb-4">
    Data Visualization
   </h2>

   <BarChart width={500} height={300} data={chartData}>

    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#06b6d4" />

   </BarChart>

  </div>

 )
}