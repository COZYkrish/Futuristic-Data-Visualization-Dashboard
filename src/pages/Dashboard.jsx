import { useEffect, useMemo, useState } from "react"

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

import CorrelationHeatmap from "../components/ai/CorrelationHeatmap"
import DatasetInsights from "../components/ai/DatasetInsights"
import OutlierDetection from "../components/ai/OutlierDetection"
import ChartRecommendation from "../components/ai/ChartRecommendation"

import { parseCSV } from "../utils/parseCSV"
import { buildColumnProfiles, toNumericOrNull } from "../utils/dataProfiling"

function aggregateChartData(data, xKey, yKey, aggregation, sortMode, topN) {
 if (!xKey || !yKey || !data.length) return []

 const grouped = data.reduce((accumulator, row) => {
  const category = String(row[xKey] ?? "Unknown")
  const numeric = toNumericOrNull(row[yKey])

  if (!accumulator[category]) {
   accumulator[category] = {
    [xKey]: category,
    value: 0,
    count: 0,
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY
   }
  }

  const entry = accumulator[category]

  if (numeric !== null) {
   entry.value += numeric
   entry.count += 1
   entry.min = Math.min(entry.min, numeric)
   entry.max = Math.max(entry.max, numeric)
  } else if (aggregation === "count") {
   entry.count += 1
  }

  return accumulator
 }, {})

 const result = Object.values(grouped).map((entry) => {
  let computed = entry.value

  if (aggregation === "avg") {
   computed = entry.count ? entry.value / entry.count : 0
  }

  if (aggregation === "count") {
   computed = entry.count
  }

  if (aggregation === "min") {
   computed = Number.isFinite(entry.min) ? entry.min : 0
  }

  if (aggregation === "max") {
   computed = Number.isFinite(entry.max) ? entry.max : 0
  }

  return {
   [xKey]: entry[xKey],
   [yKey]: Number(computed.toFixed(4))
  }
 })

 const sorted = [...result].sort((left, right) =>
  sortMode === "asc" ? left[yKey] - right[yKey] : right[yKey] - left[yKey]
 )

 return sorted.slice(0, topN)
}

export default function Dashboard() {

 const [data, setData] = useState([])
 const [datasetName, setDatasetName] = useState("")
 const [uploadError, setUploadError] = useState("")
 const [isUploading, setIsUploading] = useState(false)
 const [chartType, setChartType] = useState("bar")
 const [xKey, setXKey] = useState("")
 const [yKey, setYKey] = useState("")
 const [aggregation, setAggregation] = useState("sum")
 const [sortMode, setSortMode] = useState("desc")
 const [topN, setTopN] = useState(12)

 const handleUpload = (file) => {
  setIsUploading(true)
  setUploadError("")

  parseCSV(
   file,
   (parsedData) => {
    setData(parsedData)
    setDatasetName(file.name)
    setIsUploading(false)
   },
   (message) => {
    setData([])
    setDatasetName("")
    setUploadError(message)
    setIsUploading(false)
   }
  )
 }

 const rows = data.length
 const columns = data.length > 0 ? Object.keys(data[0]).length : 0

 const missingValues = data.reduce((total, row) => {
  return total + Object.values(row).filter(
   value => value === "" || value === null || value === undefined
  ).length
 }, 0)

 const profile = useMemo(() => buildColumnProfiles(data), [data])
 const columnNames = profile.columns
 const numericColumnNames = profile.numericColumns

 const xOptions = useMemo(() => {
  if (chartType === "scatter" || chartType === "histogram") {
   return numericColumnNames.length ? numericColumnNames : columnNames
  }
  return columnNames
 }, [chartType, columnNames, numericColumnNames])

 const yOptions = useMemo(() => {
  if (chartType === "histogram") return []
  return numericColumnNames.length ? numericColumnNames : columnNames
 }, [chartType, columnNames, numericColumnNames])

 useEffect(() => {

  if (columnNames.length === 0) {
   setXKey("")
   setYKey("")
   return
  }

  setXKey((current) => (
   current && xOptions.includes(current) ? current : xOptions[0]
  ))

  setYKey((current) => {
   if (chartType === "histogram") {
    return ""
   }

   if (current && yOptions.includes(current)) {
    return current
   }

   const fallbackNumeric = yOptions.find((column) => column !== xOptions[0])
   return fallbackNumeric ?? yOptions[0] ?? ""

  })

 }, [chartType, columnNames, xOptions, yOptions])

 const transformedData = useMemo(() => {
  if (chartType === "bar" || chartType === "line" || chartType === "pie") {
   return aggregateChartData(data, xKey, yKey, aggregation, sortMode, topN)
  }

  return data
 }, [aggregation, chartType, data, sortMode, topN, xKey, yKey])

 return (

  <div id="dashboard" className="p-8 w-full space-y-10">

   {/* Upload Section */}

   <section id="upload-dataset">
    <DatasetUpload
     onFileUpload={handleUpload}
     fileName={datasetName}
     error={uploadError}
     isUploading={isUploading}
     rows={rows}
     columns={columns}
    />
   </section>

   {/* Stats Section */}

   <div className="grid grid-cols-3 gap-6">

    <StatsCard title="Rows" value={rows} />
    <StatsCard title="Columns" value={columns} />
    <StatsCard title="Missing Values" value={missingValues} />

   </div>

   {/* Dataset Preview */}

   <DataTable data={data} />

   {/* Charts Section */}

   <section
    id="charts"
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl space-y-6"
   >

    <h2 className="text-xl font-semibold text-white">
     Data Visualization
    </h2>

    <ChartSelector chartType={chartType} setChartType={setChartType} />

    {columnNames.length > 0 && (
     <div className="grid gap-4 md:grid-cols-2">

      <label className="space-y-2">
       <span className="block text-sm font-medium text-gray-300">
        Category / X Axis
       </span>

       <select
        value={xKey}
        onChange={(event) => setXKey(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
       >

        {xOptions.map((column) => (
         <option key={column} value={column} className="bg-slate-950">
          {column}
         </option>
        ))}

       </select>
      </label>

      {chartType !== "histogram" && (
       <label className="space-y-2">

        <span className="block text-sm font-medium text-gray-300">
         Value / Y Axis
        </span>

        <select
         value={yKey}
         onChange={(event) => setYKey(event.target.value)}
         className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
        >

         {yOptions.map((column) => (

          <option key={column} value={column} className="bg-slate-950">
           {column}
          </option>

         ))}

        </select>

       </label>
      )}

      {(chartType === "bar" || chartType === "line" || chartType === "pie") && (
       <>
        <label className="space-y-2">
         <span className="block text-sm font-medium text-gray-300">
          Aggregation
         </span>
         <select
          value={aggregation}
          onChange={(event) => setAggregation(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
         >
          <option value="sum" className="bg-slate-950">Sum</option>
          <option value="avg" className="bg-slate-950">Average</option>
          <option value="count" className="bg-slate-950">Count</option>
          <option value="min" className="bg-slate-950">Minimum</option>
          <option value="max" className="bg-slate-950">Maximum</option>
         </select>
        </label>

        <label className="space-y-2">
         <span className="block text-sm font-medium text-gray-300">
          Sort
         </span>
         <select
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
         >
          <option value="desc" className="bg-slate-950">Highest First</option>
          <option value="asc" className="bg-slate-950">Lowest First</option>
         </select>
        </label>
       </>
      )}

     </div>
    )}

    {(chartType === "bar" || chartType === "line" || chartType === "pie") && (
     <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-300">
       <span>Top Categories</span>
       <span>{topN}</span>
      </div>
      <input
       type="range"
       min="5"
       max="50"
       step="1"
       value={topN}
       onChange={(event) => setTopN(Number(event.target.value))}
       className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-cyan-400"
      />
     </div>
    )}

    {/* Chart Area */}

    <div className="min-h-[360px] bg-black/30 rounded-xl p-6">

     {chartType === "bar" && (
      <BarChartComponent data={transformedData} xKey={xKey} yKey={yKey}/>
     )}

     {chartType === "line" && (
      <LineChartComponent data={transformedData} xKey={xKey} yKey={yKey}/>
     )}

     {chartType === "pie" && (
      <PieChartComponent data={transformedData} categoryKey={xKey} valueKey={yKey}/>
     )}

     {chartType === "scatter" && (
      <ScatterChartComponent data={data} xKey={xKey} yKey={yKey}/>
     )}

     {chartType === "histogram" && (
      <HistogramChart data={data} column={xKey}/>
     )}

     {chartType === "3d" && (
      <ThreeDChart data={data} xKey={xKey} yKey={yKey}/>
     )}

    </div>

   </section>


   {/* AI Analytics Section */}

   {data.length > 0 && (

    <div id="ai-insights" className="space-y-8">

     <DatasetInsights data={data} />

     <ChartRecommendation data={data} />

     <OutlierDetection data={data} />

     <CorrelationHeatmap data={data} />

    </div>

   )}

  </div>

 )
}
