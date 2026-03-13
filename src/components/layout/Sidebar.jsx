const navItems = [
 { id: "dashboard", label: "Dashboard" },
 { id: "upload-dataset", label: "Upload Dataset" },
 { id: "charts", label: "Charts" },
 { id: "ai-insights", label: "AI Insights" }
]

export default function Sidebar({ activeSection, onNavigate }) {

 return (

  <div className="w-64 min-h-screen bg-white/5 backdrop-blur-xl
  border-r border-white/10 p-6">

   <div className="space-y-6 text-sm">

    {navItems.map((item) => (
     <button
      key={item.id}
      type="button"
      onClick={() => onNavigate(item.id)}
      className={`block text-left transition ${
       activeSection === item.id
        ? "text-cyan-400 hover:text-cyan-300"
        : "text-gray-300 hover:text-white"
      }`}
     >
      {item.label}
     </button>
    ))}

   </div>

  </div>

 )

}
