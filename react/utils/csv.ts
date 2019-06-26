import parseCSV from 'csv-parse/lib/sync'
import { uniqBy } from 'ramda'
import { MessagesOfProvider } from '../typings/global'

enum TranslatableField {
  description = 'description',
  name = 'name',
}

const ID_CSV_DESC = '_ProductId'

const FIELDS_TO_CSV_DESC : Record<TranslatableField, string> = {
  'description': '_ProductDescription',
  'name': '_ProductName',
}
const uniqueByProvider = uniqBy(({ provider }: MessagesOfProvider) => provider)

async function parse(csv: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(csv)
    reader.onload = () =>
      resolve(parseCSV(reader.result as string))
    reader.onerror = (e) => reject(e)
  })
}

export async function getMessages(csv: File): Promise<MessagesOfProvider[]> {
  const [headers, ...data] = await parse(csv)
  const fieldToIndex: Partial<Record<TranslatableField, number>> = {}

  const keys = Object.values(TranslatableField) as TranslatableField[]
  keys.forEach(key => {
    const desc = FIELDS_TO_CSV_DESC[key]
    const index = headers.findIndex(header => header.startsWith(desc))
    if (index !== -1) {
      fieldToIndex[key] = index
    }
  })

  const idIndex = headers.findIndex(header => header.startsWith(ID_CSV_DESC))
  const fieldAndIndex = Object.entries(fieldToIndex)

  return uniqueByProvider(
    data.map(row => ({
      messages: fieldAndIndex.map(([key, index]) => ({
        content: row[index!],
        description: '',
        id: key,
      })),
      provider: row[idIndex],
    }))
  )
}
