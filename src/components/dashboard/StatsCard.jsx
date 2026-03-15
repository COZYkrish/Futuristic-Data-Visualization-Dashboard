import CountUp from "react-countup"

export default function StatsCard({ title, value, description, accent = "cyan" }) {
 const accentStyles = {
  cyan: "from-cyan-400/20 to-cyan-500/5 text-cyan-300 shadow-cyan-500/15",
  emerald: "from-emerald-400/20 to-emerald-500/5 text-emerald-300 shadow-emerald-500/15",
  fuchsia: "from-fuchsia-400/20 to-fuchsia-500/5 text-fuchsia-300 shadow-fuchsia-500/15",
  amber: "from-amber-400/20 to-amber-500/5 text-amber-300 shadow-amber-500/15"
 }

 const theme = accentStyles[accent] ?? accentStyles.cyan

 return (

  <div
   className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${theme} p-6 shadow-[0_0_40px_rgba(15,23,42,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1`}
  >

   <h3 className="text-sm uppercase tracking-[0.28em] text-slate-500">
    {title}
   </h3>

   <p className="mt-4 text-3xl font-bold text-white sm:text-4xl">

    <CountUp
     end={value}
     duration={1.5}
    />

   </p>

   {description && (
    <p className="mt-3 text-sm leading-6 text-slate-300">
     {description}
    </p>
   )}

  </div>

 )

}
