import { Fragment, useMemo } from "react"
import { buildColumnProfiles } from "../../utils/dataProfiling"

function correlation(x, y) {
 const n = Math.min(x.length, y.length)
 if (n < 3) return 0

 const meanX = x.reduce((sum, value) => sum + value, 0) / n
 const meanY = y.reduce((sum, value) => sum + value, 0) / n

 let numerator = 0
 let denX = 0
 let denY = 0

 for (let i = 0; i < n; i += 1) {
  const dx = x[i] - meanX
  const dy = y[i] - meanY
  numerator += dx * dy
  denX += dx * dx
  denY += dy * dy
 }

 if (!denX || !denY) return 0
 return numerator / Math.sqrt(denX * denY)
}

export default function CorrelationHeatmap({ data }) {
 const { numericColumns, matrix } = useMemo(() => {
  if (!data.length) {
   return {
    numericColumns: [],
    matrix: []
   }
  }

  const profile = buildColumnProfiles(data)
  const columns = profile.numericColumns.slice(0, 8)

  const valuesByColumn = columns.reduce((accumulator, column) => {
   accumulator[column] = profile.profiles[column].numericValues
   return accumulator
  }, {})

  const builtMatrix = columns.map((rowColumn) => {
   return columns.map((colColumn) => {
    if (rowColumn === colColumn) return 1
    return correlation(valuesByColumn[rowColumn], valuesByColumn[colColumn])
   })
  })

  return {
   numericColumns: columns,
   matrix: builtMatrix
  }
 }, [data])

 if (!data.length) return null

 if (numericColumns.length < 2) {
  return (
   <div className="rounded-xl border border-cyan-400/20 bg-white/5 p-6">
    <h2 className="mb-3 text-xl font-semibold text-cyan-300">Correlation Heatmap</h2>
    <p className="text-sm text-slate-300">Add at least two numeric columns to unlock correlation signals.</p>
   </div>
  )
 }

 return (
  <div className="rounded-xl border border-cyan-400/20 bg-white/5 p-6">
   <h2 className="mb-4 text-xl font-semibold text-cyan-300">
    Correlation Heatmap
   </h2>

   <div className="overflow-x-auto">
    <div className="grid min-w-max gap-1" style={{ gridTemplateColumns: `140px repeat(${numericColumns.length}, 72px)` }}>
     <div />
     {numericColumns.map((column) => (
      <div key={`header-${column}`} className="truncate px-1 text-center text-xs text-cyan-100/80" title={column}>
       {column}
      </div>
     ))}

     {matrix.map((row, rowIndex) => (
      <Fragment key={`row-${numericColumns[rowIndex]}`}>
       <div
        key={`label-${numericColumns[rowIndex]}`}
        className="truncate px-1 py-2 text-xs text-slate-300"
        title={numericColumns[rowIndex]}
       >
        {numericColumns[rowIndex]}
       </div>

       {row.map((value, colIndex) => {
        const alpha = Math.min(0.85, Math.abs(value))
        const positive = value >= 0
        const background = positive
         ? `rgba(34, 211, 238, ${alpha})`
         : `rgba(248, 113, 113, ${alpha})`

        return (
         <div
          key={`${rowIndex}-${colIndex}`}
          className="flex h-12 w-[72px] items-center justify-center rounded text-xs font-medium text-slate-950"
          style={{ background }}
          title={`${numericColumns[rowIndex]} vs ${numericColumns[colIndex]}: ${value.toFixed(3)}`}
         >
          {value.toFixed(2)}
         </div>
        )
       })}
      </Fragment>
     ))}
    </div>
   </div>
  </div>
 )
}
