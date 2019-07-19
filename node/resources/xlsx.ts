import xlsx from 'xlsx'

export function createXLSX(data: any[], sheetName: string) {
  const sheet = xlsx.utils.json_to_sheet(data)
  const book = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(book, sheet, sheetName)

  return xlsx.write(book, { type: 'buffer', bookType: 'xlsx' })
}

export function jsonToXLSXFields(brand: Record<string, string>, jsonToXLSXField: Record<string, string>) {
  const result: any = {}
  const brandFieldAndValues = Object.entries(brand)
  brandFieldAndValues.forEach(
    ([key, value]) => (result[jsonToXLSXField[key]] = value)
  )
  return result
}
