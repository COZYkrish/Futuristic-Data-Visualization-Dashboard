export default function Navbar(){
  return(
    <div className="h-16 flex items-center justify-between px-6
    bg-white/5 backdrop-blur-xl border-b border-white/10">

      <h1 className="text-xl font-bold text-cyan-400">
        DataVision AI
      </h1>

      <input
        placeholder="Search dataset..."
        className="bg-black/40 px-4 py-2 rounded-lg outline-none"
      />

      <div className="w-10 h-10 rounded-full bg-purple-500"></div>
    </div>
  )
}