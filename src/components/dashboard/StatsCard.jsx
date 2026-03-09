import { motion } from "framer-motion"

export default function StatsCard({title,value}){

 return(

 <motion.div
 initial={{opacity:0,y:20}}
 animate={{opacity:1,y:0}}
 className="bg-white/5 backdrop-blur-xl
 border border-white/10 rounded-xl
 p-6 shadow-lg">

  <h3 className="text-gray-400">{title}</h3>

  <p className="text-3xl text-cyan-400 font-bold">
   {value}
  </p>

 </motion.div>

 )

}