import { motion } from "framer-motion"
import CountUp from "react-countup"

export default function StatsCard({ title, value }) {

 return (

  <motion.div
   initial={{ opacity: 0, y: 30 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5 }}

   className="bg-white/5 backdrop-blur-xl
   border border-white/10
   rounded-xl
   p-6
   shadow-lg
   hover:shadow-cyan-500/20
   transition-all
   duration-300"
  >

   <h3 className="text-gray-400 text-sm mb-2">
    {title}
   </h3>

   <p className="text-3xl font-bold text-cyan-400">

    <CountUp
     end={value}
     duration={1.5}
    />

   </p>

  </motion.div>

 )

}