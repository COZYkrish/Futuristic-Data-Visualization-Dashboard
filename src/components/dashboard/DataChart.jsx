import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

export default function DataChart({data}){

 if(data.length === 0) return null

 const keys = Object.keys(data[0])

 return(

  <div className="bg-white/5 border border-white/10 p-6 rounded-xl">

   <h2 className="text-cyan-400 mb-4">
    Data Visualization
   </h2>

   <BarChart width={500} height={300} data={data}>

    <CartesianGrid strokeDasharray="3 3"/>

    <XAxis dataKey={keys[0]} />

    <YAxis/>

    <Tooltip/>

    <Bar dataKey={keys[1]} fill="#06b6d4"/>

   </BarChart>

  </div>

 )
}