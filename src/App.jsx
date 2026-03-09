import Navbar from "./components/layout/Navbar"
import Sidebar from "./components/layout/Sidebar"
import Dashboard from "./pages/Dashboard"
import ParticleBackground from "./components/ui/ParticleBackground"

function App(){

 return(

  <div>

   <ParticleBackground/>

   <Navbar/>

   <div className="flex">

    <Sidebar/>

    <Dashboard/>

   </div>

  </div>

 )

}

export default App