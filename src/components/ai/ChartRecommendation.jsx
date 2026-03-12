export default function ChartRecommendation({ data }) {

 if(!data.length) return null

 const columns = Object.keys(data[0])

 const numeric = columns.filter(
  col => !isNaN(parseFloat(data[0][col]))
 )

 const categorical = columns.filter(
  col => isNaN(parseFloat(data[0][col]))
 )

 let recommendation = ""

 if(numeric.length >=2)
 recommendation = "Scatter Plot or Correlation Heatmap recommended"

 else if(categorical.length && numeric.length)
 recommendation = "Bar Chart recommended"

 else
 recommendation = "Line Chart recommended"

 return(

 <div className="bg-white/5 p-6 rounded-xl mt-6">

 <h2 className="text-xl font-semibold text-purple-400 mb-4">
 Chart Recommendation
 </h2>

 <p className="text-gray-300">
 {recommendation}
 </p>

 </div>

 )
}