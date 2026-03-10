export default function DataTable({data}){

 if(data.length === 0) return null

 const columns = Object.keys(data[0])

 return(

  <div className="bg-white/5 border border-white/10 p-6 rounded-xl overflow-auto">

   <h2 className="text-cyan-400 mb-4">
    Dataset Preview
   </h2>

   <table className="w-full text-sm text-gray-300">

    <thead>
     <tr>
      {columns.map(col=>(
       <th key={col} className="p-2 text-left">{col}</th>
      ))}
     </tr>
    </thead>

    <tbody>
     {data.slice(0,10).map((row,i)=>(
      <tr key={i}>
       {columns.map(col=>(
        <td key={col} className="p-2">
         {row[col]}
        </td>
       ))}
      </tr>
     ))}
    </tbody>

   </table>

  </div>

 )
}