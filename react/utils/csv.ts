import { read, utils } from 'xlsx'

import { uniqBy } from 'ramda'
import { MessagesOfProvider, TranslationMessage } from '../typings/typings'
import { Entity, ENTITY_FIELDS } from './constants'

const ENTITY_ID_HEADER: Partial<Record<Entity, string>> = {
  brand: '_BrandId',
  category: '_CategoryId',
  product: '_ProductId',
  sku: '_SkuId',
  specification: '_Name',
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

export async function getMessages(entity: Entity, csv: File): Promise<MessagesOfProvider[]> {
  const [headers, ...data] = await parse(csv)
  const fieldToIndex: Partial<Record<string, number>> = {}

  Object.entries(ENTITY_FIELDS[entity]).forEach(([key, desc]) => {
    const index = headers.findIndex(header => header.startsWith(desc))
    if (index !== -1) {
      fieldToIndex[key] = index
    }
  })

  const fieldAndIndex = Object.entries(fieldToIndex) as Array<[string, number]>
  if (fieldAndIndex.length === 0) {
    throw new Error('NO_TRANSLATABLE_FIELD_FOUND')
  }

  const id = ENTITY_ID_HEADER[entity] || ''
  const idIndex = headers.findIndex(header => header.startsWith(id))
  if (idIndex === -1) {
    throw new Error('ID_NOT_FOUND')
  }

  const messagesByProvider = uniqueByProvider(
    data.map(row => ({
      messages: getProviderMessages(fieldAndIndex, row),
      provider: row[idIndex] && row[idIndex].toString(),
    }))
  ).filter(({ messages, provider }) => messages.length > 0 && !!provider)

  return messagesByProvider
}
