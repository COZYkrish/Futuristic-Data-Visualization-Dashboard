import Papa from "papaparse"

export function parseCSV(file, onSuccess, onError) {
 Papa.parse(file, {
  header: true,
  skipEmptyLines: "greedy",
  transformHeader: (header) => header.trim(),
  complete: (results) => {
   const rows = Array.isArray(results.data)
    ? results.data.filter((row) =>
       row && Object.values(row).some((value) => value !== "")
      )
    : []

   const hasColumns = Boolean(results.meta?.fields?.length)
   const parseError = results.errors?.find((error) => error.code !== "UndetectableDelimiter")

   if (parseError) {
    onError?.("Could not parse this CSV file. Check the file format and try again.")
    return
   }

   if (!hasColumns || rows.length === 0) {
    onError?.("The selected CSV is empty or does not contain usable rows.")
    return
   }

   onSuccess(rows)
  },
  error: () => {
   onError?.("The file could not be read. Try selecting it again.")
  }
 })
}
