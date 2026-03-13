export default function Navbar(){
  return(
    <div className="flex flex-col gap-4 px-4 py-4
    bg-white/5 backdrop-blur-xl border-b border-white/10 sm:px-6 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0">

      <div className="flex items-center justify-between gap-4">
      <h1 className="text-lg font-bold text-cyan-400 sm:text-xl">
        DataVision AI
      </h1>

      <div className="h-10 w-10 rounded-full bg-purple-500 lg:hidden"></div>
      </div>

      <div className="flex w-full items-center gap-3 lg:w-auto">
      <input
        placeholder="Search dataset..."
        className="w-full min-w-0 rounded-lg bg-black/40 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-500 lg:w-80"
      />

      <div className="hidden h-10 w-10 rounded-full bg-purple-500 lg:block"></div>
      </div>
    </div>
  )
}
