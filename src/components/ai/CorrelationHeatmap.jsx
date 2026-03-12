import { useMemo } from "react"

export default function CorrelationHeatmap({ data }) {

 const numericKeys = Object.keys(data[0] || {}).filter(
  key => !isNaN(parseFloat(data[0][key]))
 )

 const correlationMatrix = useMemo(() => {

  const matrix = numericKeys.map(k =>
   data.map(row => parseFloat(row[k]))
  )

  const corr = []

  for(let i=0;i<matrix.length;i++){
   corr[i] = []
   for(let j=0;j<matrix.length;j++){

    const x = matrix[i]
    const y = matrix[j]

    const meanX = x.reduce((a,b)=>a+b)/x.length
    const meanY = y.reduce((a,b)=>a+b)/y.length

    let num=0
    let denX=0
    let denY=0

    for(let k=0;k<x.length;k++){
     num += (x[k]-meanX)*(y[k]-meanY)
     denX += (x[k]-meanX)**2
     denY += (y[k]-meanY)**2
    }

    corr[i][j] = num / Math.sqrt(denX*denY)
   }
  }

  return corr

 },[data])

 if(!data.length) return null

 return (

 <div className="bg-white/5 p-6 rounded-xl mt-6">

 <h2 className="text-xl font-semibold mb-4 text-cyan-400">
 Correlation Heatmap
 </h2>

 <div className="grid gap-1">

 {correlationMatrix.map((row,i)=>(

  <div key={i} className="flex">

   {row.map((val,j)=>{

    const intensity = Math.abs(val)*255

    return(
     <div
     key={j}
     className="w-12 h-12 flex items-center justify-center text-xs"
     style={{
      background:`rgba(0,255,255,${Math.abs(val)})`
     }}
     >
      {val.toFixed(2)}
     </div>
    )
   })}

  </div>

 ))}

 </div>

 </div>
 )
}