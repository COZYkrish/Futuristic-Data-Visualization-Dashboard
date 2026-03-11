import { useState } from "react"

export default function ChartSelector({ setChartType }) {

 return (
  <div className="flex gap-4 mb-6">

   <button onClick={()=>setChartType("bar")}>Bar</button>
   <button onClick={()=>setChartType("line")}>Line</button>
   <button onClick={()=>setChartType("pie")}>Pie</button>
   <button onClick={()=>setChartType("scatter")}>Scatter</button>
   <button onClick={()=>setChartType("histogram")}>Histogram</button>
   <button onClick={()=>setChartType("3d")}>3D</button>

  </div>
 )
}