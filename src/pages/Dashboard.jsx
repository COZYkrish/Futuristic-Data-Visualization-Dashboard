import { useState } from "react"
import StatsCard from "../components/dashboard/StatsCard"
import DatasetUpload from "../components/upload/DatasetUpload"
import DataTable from "../components/dashboard/DataTable"
import DataChart from "../components/dashboard/DataChart"
import { parseCSV } from "../utils/parseCSV"

export default function Dashboard(){

 const [data, setData] = useState([])

 const handleUpload = (file) => {
  parseCSV(file, (parsedData) => {
   setData(parsedData)
  })
 }

 // Dataset statistics

 const rows = data.length

 const columns = data.length > 0 ? Object.keys(data[0]).length : 0

 const missingValues = data.reduce((total, row) => {
  return total + Object.values(row).filter(
   value => value === "" || value === null || value === undefined
  ).length
 }, 0)

 return(

  <div className="p-8 w-full space-y-8">

   {/* Upload Section */}

   <DatasetUpload onFileUpload={handleUpload} />

   {/* Stats Section */}

   <div className="grid grid-cols-3 gap-6">

    <StatsCard
     title="Rows"
     value={rows}
    />

    <StatsCard
     title="Columns"
     value={columns}
    />

    <StatsCard
     title="Missing Values"
     value={missingValues}
    />

   </div>

   {/* Dataset Preview */}

   <DataTable data={data} />

   {/* Charts */}

   <DataChart data={data} />

  </div>

 )
}