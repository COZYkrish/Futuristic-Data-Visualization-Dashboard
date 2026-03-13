import { useState } from "react"

import Navbar from "./components/layout/Navbar"
import Sidebar from "./components/layout/Sidebar"
import Dashboard from "./pages/Dashboard"
import Charts from "./pages/Charts"
import AIInsights from "./pages/AIInsights"
import ParticleBackground from "./components/ui/ParticleBackground"
import { parseCSV } from "./utils/parseCSV"

function App() {
 const [activeItem, setActiveItem] = useState("dashboard")
 const [currentPage, setCurrentPage] = useState("dashboard")
 const [dashboardTarget, setDashboardTarget] = useState("top")
 const [data, setData] = useState([])
 const [datasetName, setDatasetName] = useState("")
 const [uploadError, setUploadError] = useState("")
 const [isUploading, setIsUploading] = useState(false)

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

 const handleNavigate = (itemId) => {
  setActiveItem(itemId)

  if (itemId === "charts") {
   setCurrentPage("charts")
   return
  }

  if (itemId === "ai-insights") {
   setCurrentPage("ai-insights")
   return
  }

  setCurrentPage("dashboard")
  setDashboardTarget(itemId === "dashboard" ? "top" : itemId)
 }

 return (

  <div className="relative min-h-screen overflow-x-hidden">

   <ParticleBackground/>

   <Navbar/>

   <div className="flex flex-col lg:flex-row">

    <Sidebar activeItem={activeItem} onNavigate={handleNavigate} />

    {currentPage === "charts" ? (
     <Charts
      data={data}
      datasetName={datasetName}
      uploadError={uploadError}
     />
    ) : currentPage === "ai-insights" ? (
     <AIInsights
      data={data}
      datasetName={datasetName}
      uploadError={uploadError}
     />
    ) : (
     <Dashboard
      data={data}
      datasetName={datasetName}
      uploadError={uploadError}
      isUploading={isUploading}
      onFileUpload={handleUpload}
      focusTarget={dashboardTarget}
      onChartsNavigate={() => handleNavigate("charts")}
      onAIInsightsNavigate={() => handleNavigate("ai-insights")}
     />
    )}

   </div>

  </div>

 )

}

export default App
