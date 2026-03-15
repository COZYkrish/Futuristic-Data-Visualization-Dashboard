import { useMemo, useState } from "react"

function formatValue(value) {
 if (value === null || value === undefined || value === "") return "-"
 if (typeof value === "number") return value.toLocaleString()
 if (typeof value === "boolean") return value ? "True" : "False"
 return String(value)
}

function compareValues(left, right) {
 const leftString = String(left ?? "")
 const rightString = String(right ?? "")

 const leftNumber = Number(leftString)
 const rightNumber = Number(rightString)
 const leftIsNumber = leftString.trim() !== "" && Number.isFinite(leftNumber)
 const rightIsNumber = rightString.trim() !== "" && Number.isFinite(rightNumber)

 if (leftIsNumber && rightIsNumber) {
  return leftNumber - rightNumber
 }

 return leftString.localeCompare(rightString, undefined, { numeric: true, sensitivity: "base" })
}

export default function DataTable({ data }) {
 const [query, setQuery] = useState("")
 const [sortColumn, setSortColumn] = useState("")
 const [sortDirection, setSortDirection] = useState("asc")
 const [rowLimit, setRowLimit] = useState(10)

 const columns = useMemo(() => (data.length ? Object.keys(data[0]) : []), [data])

 const filteredData = useMemo(() => {
  if (!data.length) return []
  if (!query.trim()) return data

  const normalizedQuery = query.trim().toLowerCase()

  return data.filter((row) => {
   return columns.some((column) => {
    const value = row[column]
    return String(value ?? "").toLowerCase().includes(normalizedQuery)
   })
  })
 }, [columns, data, query])

 const sortedData = useMemo(() => {
  if (!sortColumn) return filteredData

  const sorted = [...filteredData].sort((left, right) => {
   const result = compareValues(left[sortColumn], right[sortColumn])
   return sortDirection === "asc" ? result : -result
  })

  return sorted
 }, [filteredData, sortColumn, sortDirection])

 if (data.length === 0) return null

 const visibleRows = sortedData.slice(0, rowLimit)

 const handleSort = (column) => {
  if (sortColumn === column) {
   setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
   return
  }

  setSortColumn(column)
  setSortDirection("asc")
 }

 return (
  <section className="overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(2,6,23,0.95))] shadow-[0_0_50px_rgba(15,23,42,0.28)]">
   <div className="border-b border-white/10 px-4 py-5 sm:px-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
     <div>
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
       Dataset Preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">
       Explore rows with live filtering and sort controls
      </h2>
      <p className="mt-2 text-sm leading-7 text-slate-400">
       Scan the uploaded dataset before moving into charts or AI diagnostics.
      </p>
     </div>

     <div className="grid gap-3 sm:grid-cols-[minmax(0,240px)_160px]">
      <input
       type="text"
       value={query}
       onChange={(event) => setQuery(event.target.value)}
       placeholder="Search any value..."
       className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
      />

      <select
       value={rowLimit}
       onChange={(event) => setRowLimit(Number(event.target.value))}
       className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
      >
       <option value={10} className="bg-slate-950">Show 10 rows</option>
       <option value={25} className="bg-slate-950">Show 25 rows</option>
       <option value={50} className="bg-slate-950">Show 50 rows</option>
      </select>
     </div>
    </div>

    <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-300">
     <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1">
      {data.length.toLocaleString()} total rows
     </span>
     <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
      {columns.length} columns
     </span>
     <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
      {sortedData.length.toLocaleString()} matched rows
     </span>
     {sortColumn && (
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
       Sorted by {sortColumn} ({sortDirection})
      </span>
     )}
    </div>
   </div>

   <div className="overflow-x-auto px-2 py-3 sm:px-4">
    <table className="min-w-full text-sm text-gray-300">
     <thead className="sticky top-0 bg-slate-950/80 backdrop-blur-xl">
      <tr>
       {columns.map((column) => (
        <th
         key={column}
         className="px-3 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400"
        >
         <button
          type="button"
          onClick={() => handleSort(column)}
          className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-white"
         >
          <span>{column}</span>
          {sortColumn === column && (
           <span className="text-cyan-300">
            {sortDirection === "asc" ? "↑" : "↓"}
           </span>
          )}
         </button>
        </th>
       ))}
      </tr>
     </thead>

     <tbody>
      {visibleRows.map((row, index) => (
       <tr
        key={`${index}-${columns.map((column) => row[column]).join("|")}`}
        className="border-t border-white/5 odd:bg-white/[0.03] even:bg-transparent transition hover:bg-cyan-400/[0.05]"
       >
        {columns.map((column) => (
         <td key={column} className="whitespace-nowrap px-3 py-3 text-slate-200">
          {formatValue(row[column])}
         </td>
        ))}
       </tr>
      ))}
     </tbody>
    </table>

    {visibleRows.length === 0 && (
     <div className="px-4 py-12 text-center text-sm text-slate-400">
      No rows matched the current search.
     </div>
    )}
   </div>
  </section>

 )
}
