function toNumber(value) {
 if (typeof value === "number") return Number.isFinite(value) ? value : null
 if (typeof value !== "string") return null

 const normalized = value.trim().replace(/,/g, "")
 if (!normalized) return null

 const parsed = Number(normalized)
 return Number.isFinite(parsed) ? parsed : null
}

function getColumns(data) {
 if (!data.length) return []
 return Object.keys(data[0])
}

export function buildColumnProfiles(data) {
 const columns = getColumns(data)

 const profiles = columns.reduce((accumulator, column) => {
  accumulator[column] = {
   column,
   total: data.length,
   missing: 0,
   nonMissing: 0,
   numericValues: [],
   numericCount: 0,
   distinct: new Set()
  }
  return accumulator
 }, {})

 data.forEach((row) => {
  columns.forEach((column) => {
   const value = row[column]
   const entry = profiles[column]

   if (value === "" || value === null || value === undefined) {
    entry.missing += 1
    return
   }

   entry.nonMissing += 1
   entry.distinct.add(String(value))

   const numeric = toNumber(value)
   if (numeric !== null) {
    entry.numericValues.push(numeric)
    entry.numericCount += 1
   }
  })
 })

 const normalizedProfiles = columns.reduce((accumulator, column) => {
  const profile = profiles[column]
  const numericRatio = profile.nonMissing
   ? profile.numericCount / profile.nonMissing
   : 0

  accumulator[column] = {
   ...profile,
   distinctCount: profile.distinct.size,
   numericRatio,
   isNumeric: numericRatio >= 0.7 && profile.numericCount >= 2
  }
  delete accumulator[column].distinct
  return accumulator
 }, {})

 const numericColumns = columns.filter((column) => normalizedProfiles[column].isNumeric)
 const categoricalColumns = columns.filter((column) => !normalizedProfiles[column].isNumeric)

 return {
  columns,
  profiles: normalizedProfiles,
  numericColumns,
  categoricalColumns
 }
}

export function toNumericOrNull(value) {
 return toNumber(value)
}
