import { useState } from "react"

import StatsCard from "../components/dashboard/StatsCard"
import DatasetUpload from "../components/upload/DatasetUpload"
import DataTable from "../components/dashboard/DataTable"

import ChartSelector from "../components/charts/ChartSelector"
import BarChartComponent from "../components/charts/BarChartComponent"
import LineChartComponent from "../components/charts/LineChartComponent"
import PieChartComponent from "../components/charts/PieChartComponent"
import ScatterChartComponent from "../components/charts/ScatterChartComponent"
import HistogramChart from "../components/charts/HistogramChart"
import ThreeDChart from "../components/charts/ThreeDChart"

import { parseCSV } from "../utils/parseCSV"

export default function Dashboard(){

 const [data, setData] = useState([])
 const [chartType, setChartType] = useState("bar")

 const handleUpload = (file) => {
  parseCSV(file, (parsedData) => {
   setData(parsedData)
  })
 }

 const rows = data.length
 const columns = data.length > 0 ? Object.keys(data[0]).length : 0

 const missingValues = data.reduce((total, row) => {
  return total + Object.values(row).filter(
   value => value === "" || value === null || value === undefined
  ).length
 }, 0)

 const columnNames = data.length > 0 ? Object.keys(data[0]) : []
 const xKey = columnNames[0]
 const yKey = columnNames[1]

 return(

  <div className="p-8 w-full space-y-10">

   {/* Upload Section */}

   <DatasetUpload onFileUpload={handleUpload} />

   {/* Stats Section */}

   <div className="grid grid-cols-3 gap-6">

    <StatsCard title="Rows" value={rows} />
    <StatsCard title="Columns" value={columns} />
    <StatsCard title="Missing Values" value={missingValues} />

   </div>

   {/* Dataset Preview */}

   <DataTable data={data} />

   {/* Charts Section */}

   <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">

    <h2 className="text-xl font-semibold text-white">
     Data Visualization
    </h2>

    {/* Chart Selector */}

    <ChartSelector chartType={chartType} setChartType={setChartType} />

    {/* Chart Area */}

    <div className="min-h-[360px] bg-black/30 rounded-xl p-6">

     {chartType === "bar" && (
      <BarChartComponent data={data} xKey={xKey} yKey={yKey}/>
     )}

     {chartType === "line" && (
      <LineChartComponent data={data} xKey={xKey} yKey={yKey}/>
     )}

     {chartType === "pie" && (
      <PieChartComponent data={data} dataKey={xKey}/>
     )}

     {chartType === "scatter" && (
      <ScatterChartComponent data={data} xKey={xKey} yKey={yKey}/>
     )}

     {chartType === "histogram" && (
      <HistogramChart data={data} column={xKey}/>
     )}

     {chartType === "3d" && (
      <ThreeDChart data={data}/>
     )}

    </div>

   </div>

  </div>

 )
}
