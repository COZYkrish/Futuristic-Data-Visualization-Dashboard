import { motion } from "framer-motion"

export default function ChartCard({
 badge,
 title,
 description,
 metrics = [],
 buttonLabel,
 onClick,
 accent = "cyan"
}) {
 const accentStyles = {
  cyan: {
   border: "border-cyan-400/20",
   glow: "shadow-[0_0_60px_rgba(34,211,238,0.08)]",
   badge: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
   button: "border-cyan-300/40 bg-cyan-400/15 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-400/25"
  },
  fuchsia: {
   border: "border-fuchsia-400/20",
   glow: "shadow-[0_0_60px_rgba(217,70,239,0.08)]",
   badge: "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200",
   button: "border-fuchsia-300/40 bg-fuchsia-400/15 text-fuchsia-100 hover:border-fuchsia-200 hover:bg-fuchsia-400/25"
  }
 }

 const theme = accentStyles[accent] ?? accentStyles.cyan

 return (
  <motion.section
   initial={{ opacity: 0, y: 24 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.45 }}
   className={`rounded-[24px] border ${theme.border} bg-[linear-gradient(135deg,_rgba(15,23,42,0.92),_rgba(2,6,23,0.96))] p-6 ${theme.glow}`}
  >
   <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-2xl space-y-4">
     <span className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] ${theme.badge}`}>
      {badge}
     </span>
     <div className="space-y-3">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">
       {title}
      </h2>
      <p className="text-sm leading-7 text-slate-300">
       {description}
      </p>
     </div>

     {metrics.length > 0 && (
      <div className="flex flex-wrap gap-3 text-xs text-slate-200">
       {metrics.map((metric) => (
        <span
         key={metric}
         className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
        >
         {metric}
        </span>
       ))}
      </div>
     )}
    </div>

    <button
     type="button"
     onClick={onClick}
     className={`inline-flex w-full items-center justify-center rounded-2xl border px-5 py-3 text-sm font-medium transition lg:w-fit ${theme.button}`}
    >
     {buttonLabel}
    </button>
   </div>
  </motion.section>
 )
}
