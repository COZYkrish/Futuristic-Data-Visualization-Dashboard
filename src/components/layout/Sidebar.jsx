export default function Sidebar(){

 return(

  <div className="w-64 min-h-screen bg-white/5 backdrop-blur-xl
  border-r border-white/10 p-6">

   <div className="space-y-6 text-sm">

    <div className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition">
     Dashboard
    </div>

    <div className="text-gray-300 cursor-pointer hover:text-white transition">
     Upload Dataset
    </div>

    <div className="text-gray-300 cursor-pointer hover:text-white transition">
     Charts
    </div>

    <div className="text-gray-300 cursor-pointer hover:text-white transition">
     AI Insights
    </div>

   </div>

  </div>

 )

}