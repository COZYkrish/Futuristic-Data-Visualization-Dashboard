export default function OutlierDetection({ data }) {

 if(!data.length) return null

 const columns = Object.keys(data[0]).filter(
  col => !isNaN(parseFloat(data[0][col]))
 )

 const outliers = []

 columns.forEach(col => {

  const values = data.map(r => parseFloat(r[col]))

  const mean = values.reduce((a,b)=>a+b)/values.length

  const std = Math.sqrt(
   values.map(v => (v-mean)**2)
   .reduce((a,b)=>a+b)/values.length
  )

  values.forEach((v,i)=>{
   const z = (v-mean)/std

   if(Math.abs(z) > 3){
    outliers.push({
     column:col,
     value:v,
     row:i
    })
   }
  })

 })

 return(

 <div className="bg-white/5 p-6 rounded-xl mt-6">

 <h2 className="text-xl font-semibold text-red-400 mb-4">
 Outlier Detection
 </h2>

 <p className="text-gray-300">
 Found {outliers.length} potential outliers
 </p>

 </div>

 )
}