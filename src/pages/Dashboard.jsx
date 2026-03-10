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

 return(

  <div className="p-8 w-full space-y-8">

   {/* Upload Section */}

   <DatasetUpload onFileUpload={handleUpload} />

   {/* Stats Section */}

   <div className="grid grid-cols-3 gap-6">

    <StatsCard
     title="Rows"
     value={data.length}
    />

    <StatsCard
     title="Columns"
     value={data.length > 0 ? Object.keys(data[0]).length : 0}
    />

    <StatsCard
     title="Missing Values"
     value="0"
    />

   </div>

   {/* Dataset Preview Table */}

   <DataTable data={data} />
   <DataChart data={data}/>

  </div>

 )
}