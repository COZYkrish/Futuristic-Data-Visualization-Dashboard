const navItems = [
 { id: "dashboard", label: "Dashboard" },
 { id: "upload-dataset", label: "Upload Dataset" },
 { id: "charts", label: "Charts" },
 { id: "ai-insights", label: "AI Insights" }
]

export default function Sidebar({ activeItem, onNavigate }) {

 return (

  <div className="w-full border-b border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-6">

   <div className="flex gap-3 overflow-x-auto pb-1 text-sm lg:block lg:space-y-6 lg:pb-0">

    {navItems.map((item) => (
     <button
      key={item.id}
      type="button"
      onClick={() => onNavigate(item.id)}
      className={`shrink-0 rounded-full border px-4 py-2 text-left transition lg:block lg:w-full lg:rounded-none lg:border-0 lg:px-0 lg:py-0 ${
       activeItem === item.id
        ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:text-cyan-200 lg:bg-transparent"
        : "border-white/10 bg-black/20 text-gray-300 hover:border-white/20 hover:text-white lg:bg-transparent"
      }`}
     >
      {item.label}
     </button>
    ))}

   </div>

  </div>

 )

}
