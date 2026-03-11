const chartOptions = [
 { id: "bar", label: "Bar" },
 { id: "line", label: "Line" },
 { id: "pie", label: "Pie" },
 { id: "scatter", label: "Scatter" },
 { id: "histogram", label: "Histogram" },
 { id: "3d", label: "3D" }
]

export default function ChartSelector({ chartType, setChartType }) {

 return (
  <div className="flex flex-wrap gap-3 mb-6">

   {chartOptions.map((option) => (
    <button
     key={option.id}
     type="button"
     onClick={() => setChartType(option.id)}
     className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
      chartType === option.id
       ? "border-cyan-400 bg-cyan-400/20 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
       : "border-white/15 bg-white/5 text-gray-300 hover:border-cyan-400/40 hover:text-white"
     }`}
    >
     {option.label}
    </button>
   ))}

  </div>
 )
}
