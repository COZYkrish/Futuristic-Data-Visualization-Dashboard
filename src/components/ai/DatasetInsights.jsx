export default function DatasetInsights({ data }) {

 if(!data.length) return null

 const columns = Object.keys(data[0])

 const rowCount = data.length
 const colCount = columns.length

 const insights = []

 insights.push(`Dataset contains ${rowCount} rows`)
 insights.push(`Dataset has ${colCount} columns`)

 const numericCols = columns.filter(
  col => !isNaN(parseFloat(data[0][col]))
 )

 insights.push(`${numericCols.length} numeric features detected`)

 return (

 <div className="bg-white/5 p-6 rounded-xl mt-6">

 <h2 className="text-xl font-semibold text-cyan-400 mb-4">
 AI Dataset Insights
 </h2>

 <ul className="space-y-2 text-gray-300">

 {insights.map((insight,i)=>(
  <li key={i}>• {insight}</li>
 ))}

 </ul>

 </div>
 )
}