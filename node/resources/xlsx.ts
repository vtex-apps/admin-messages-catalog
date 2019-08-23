import xlsx from 'xlsx'

export function createXLSX(sheets: Record<string, Array<unknown>>): Buffer {
  const book = xlsx.utils.book_new()

  Object.entries(sheets).forEach(([sheetName, data]) => {
    const sheet = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(book, sheet, sheetName)
  })

  return xlsx.write(book, { type: 'buffer', bookType: 'xlsx' })
}

export function jsonToXLSXFields(data: Record<string, unknown>, jsonToXLSXMap: Record<string, string>) {
  return Object.entries(jsonToXLSXMap).reduce(
    (result, [jsonKey, xlsxKey]) => {
      result[xlsxKey] = data[jsonKey]
      return result
    },
    {} as Record<string, unknown>
  )
}
