import { buildColumnProfiles } from "./dataProfiling"

function isMissing(value) {
 return value === "" || value === null || value === undefined
}

function pickPrimaryDimension(profile) {
 return profile.columns
  .map((column) => ({
   column,
   distinct: profile.profiles[column].distinctCount,
   missing: profile.profiles[column].missing
  }))
  .sort((left, right) => {
   if (right.distinct !== left.distinct) return right.distinct - left.distinct
   return left.missing - right.missing
  })[0]?.column ?? ""
}

function pickPrimaryMetric(profile) {
 return profile.numericColumns
  .map((column) => {
   const values = profile.profiles[column].numericValues
   if (!values.length) return null

   const min = Math.min(...values)
   const max = Math.max(...values)

   return {
    column,
    spread: max - min
   }
  })
  .filter(Boolean)
  .sort((left, right) => right.spread - left.spread)[0]?.column ?? ""
}

export function summarizeDataset(data, datasetName = "") {
 if (!data.length) {
  return {
   datasetName,
   rows: 0,
   columns: 0,
   missingValues: 0,
   completeness: 0,
   qualityScore: 0,
   numericColumns: 0,
   categoricalColumns: 0,
   totalCells: 0,
   populatedCells: 0,
   primaryDimension: "",
   primaryMetric: "",
   status: "Waiting for dataset"
  }
 }

 const profile = buildColumnProfiles(data)
 const rows = data.length
 const columns = profile.columns.length
 const totalCells = rows * columns
 const missingValues = data.reduce((total, row) => {
  return total + Object.values(row).filter(isMissing).length
 }, 0)
 const populatedCells = totalCells - missingValues
 const completeness = totalCells ? populatedCells / totalCells : 0

 return {
  datasetName,
  rows,
  columns,
  missingValues,
  completeness,
  qualityScore: Math.round(completeness * 100),
  numericColumns: profile.numericColumns.length,
  categoricalColumns: profile.categoricalColumns.length,
  totalCells,
  populatedCells,
  primaryDimension: pickPrimaryDimension(profile),
  primaryMetric: pickPrimaryMetric(profile),
  status: `${rows.toLocaleString()} rows synced`
 }
}
