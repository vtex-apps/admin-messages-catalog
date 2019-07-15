import { read, utils } from 'xlsx'

import { uniqBy } from 'ramda'
import { MessagesOfProvider, TranslationMessage } from '../typings/typings'

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
    reader.readAsBinaryString(csv)
    reader.onload = () => {
      const book = read(reader.result, {type: 'binary'})

      if (book.SheetNames.length !== 1) {
        throw new Error('XLS_SINGLE_SHEET')
      }

      const sheet = Object.values(book.Sheets)[0]

      const data = utils.sheet_to_json(sheet) as Array<Record<string, string>>
      const headers = Object.keys(data[0])

      // Export as CSV table, first line contain headers and subsequent lines contain data
      resolve([
        headers,
        ...data.map(row => headers.map(header => row[header])),
      ])
    }

    reader.onerror = (e) => reject(e)
  })
}


function getProviderMessages(
  fieldAndIndex: Array<[string, number]>,
  row: string[]
): TranslationMessage[] {
  return (
    fieldAndIndex
      .map(([key, index]) => ({
        content: row[index!],
        description: '',
        id: key,
      }))
      // TODO: check if this filter is right
      .filter(({ content }) => !!content)
  )
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

  const fieldAndIndex = Object.entries(fieldToIndex) as Array<[string, number]>
  if (fieldAndIndex.length === 0) {
    throw new Error('NO_TRANSLATABLE_FIELD_FOUND')
  }

  const idIndex = headers.findIndex(header => header.startsWith(ID_CSV_DESC))
  if (idIndex === -1) {
    throw new Error('ID_NOT_FOUND')
  }

  const messagesByProvider = uniqueByProvider(
    data.map(row => ({
      messages: getProviderMessages(fieldAndIndex, row),
      provider: row[idIndex].toString(),
    }))
  ).filter(({ messages, provider }) => messages.length > 0 && !!provider)

  return messagesByProvider
}
