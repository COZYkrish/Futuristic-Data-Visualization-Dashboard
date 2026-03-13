import { useEffect, useState } from "react"

import Navbar from "./components/layout/Navbar"
import Sidebar from "./components/layout/Sidebar"
import Dashboard from "./pages/Dashboard"
import ParticleBackground from "./components/ui/ParticleBackground"

const sectionIds = ["dashboard", "upload-dataset", "charts", "ai-insights"]

function App() {
 const [activeSection, setActiveSection] = useState("dashboard")

 useEffect(() => {
  const sections = sectionIds
   .map((id) => document.getElementById(id))
   .filter(Boolean)

  if (!sections.length) return undefined

  const observer = new IntersectionObserver(
   (entries) => {
    const visibleEntries = entries
     .filter((entry) => entry.isIntersecting)
     .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

    if (visibleEntries.length > 0) {
     setActiveSection(visibleEntries[0].target.id)
    }
   },
   {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.2, 0.4, 0.6]
   }
  )

  sections.forEach((section) => observer.observe(section))

  return () => observer.disconnect()
 }, [])

 const handleNavigate = (sectionId) => {
  const target = document.getElementById(sectionId)
  if (!target) return

  setActiveSection(sectionId)
  target.scrollIntoView({
   behavior: "smooth",
   block: "start"
  })
 }

 return (

  <div className="relative">

   <ParticleBackground/>

   <Navbar/>

   <div className="flex">

    <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
    <Dashboard/>

   </div>

  </div>

 )

}

export default App
