export default function DataTable({ data }) {

 if(data.length === 0) return null

 const columns = Object.keys(data[0])

 return (

  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">

   <div className="border-b border-white/10 px-4 py-4 sm:px-6">
    <h2 className="text-cyan-400">
     Dataset Preview
    </h2>
    <p className="mt-1 text-xs text-slate-400">
     Showing the first 10 rows. Scroll horizontally on smaller screens.
    </p>
   </div>

   <div className="overflow-x-auto px-2 py-3 sm:px-4">
   <table className="min-w-full text-sm text-gray-300">

    <thead>
     <tr>
      {columns.map(col => (
       <th key={col} className="whitespace-nowrap px-3 py-2 text-left text-xs uppercase tracking-wide text-slate-400">
        {col}
       </th>
      ))}
     </tr>
    </thead>

    <tbody>
     {data.slice(0,10).map((row,i) => (
      <tr key={i}>
       {columns.map(col => (
        <td key={col} className="whitespace-nowrap px-3 py-2 text-slate-200">
         {row[col] || "-"}
        </td>
       ))}
      </tr>
     ))}
    </tbody>

   </table>
   </div>

  </div>

 )
}
