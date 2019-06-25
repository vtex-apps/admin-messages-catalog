import { SaveArgs as TranslateMessageArgs } from '@vtex/api'
import parse from './utils/parser'

type MessagesOfProvider = TranslateMessageArgs['messagesByProvider'][0]

enum TranslatableField {
  description = 'description',
  name = 'name',
}

const ID_CSV_DESC = '_ProductId'

const FIELDS_TO_CSV_DESC : Record<TranslatableField, string> = {
  'description': '_ProductDescription',
  'name': '_ProductName',
}

async function addProductTranslationsCSV(csv: FileUpload, translateTo: string, ctx: Context): Promise<string[]> {
  const { messagesGraphQL } = ctx.clients

  const [headers, ...data] = await parse(csv)
  const fieldToIndex: Partial<Record<TranslatableField, number>> = {}

  const keys = Object.keys(TranslatableField) as TranslatableField[]
  keys.forEach(key => {
    const desc = FIELDS_TO_CSV_DESC[key]
    const index = headers.findIndex(header => header.startsWith(desc))
    if (index !== -1) {
      fieldToIndex[key] = index
    }
  })

  const idIndex = headers.findIndex(header => header.startsWith(ID_CSV_DESC))
  const fieldAndIndex = Object.entries(fieldToIndex)

  const messagesByProvider: MessagesOfProvider[] = data.map(
    row => ({
      messages: fieldAndIndex.map(([key, index]) => ({
        content: row[index!],
        description: '',
        id: key,
      })),
      provider: `Product-id.${row[idIndex]}`,
    })
  )
  
  const results = await Promise.all(
    messagesByProvider.map(provider =>
      messagesGraphQL
        .save({
          messagesByProvider: [provider],
          to: translateTo,
        })
        .then(success => [success, provider] as [boolean, MessagesOfProvider])
    )
  )

  const failures = results.filter(([success]) => !success)
  const getProductId = ({ provider }: MessagesOfProvider) => provider.split('.')[1]
  return failures.map(([_, messages]) => getProductId(messages))
}

export async function mockAddProductTranslationsCSV(_: FileUpload, translateTo: string, ctx: Context): Promise<string[]> {
  const { messagesGraphQL } = ctx.clients

  const messagesByProvider: TranslateMessageArgs['messagesByProvider'] = []
  for (let index = 1; index <= 300; index++) {
    messagesByProvider.push({
      messages: [
        {
          content: 'SKJNDAISDNSAD NASIDU NSDUINSADI SANDAIS UIDBASIUDBDUISDB',
          description: '',
          id: 'name',
        },
        {
          content: 'SKJNDAISDNSAD NASIDU NSDUINSADI SANDAIS UIDBASIUDBDUISDB',
          description: '',
          id: 'description',
        },
      ],
      provider: `Product-id.${index}`,
    })
  }  

  const startSAVE = process.hrtime()
  const results = await Promise.all(
    messagesByProvider.map(provider =>
      messagesGraphQL
        .save({
          messagesByProvider: [provider],
          to: translateTo,
        })
        .catch(() => [false, provider] as [boolean, MessagesOfProvider])
        .then(success => [success, provider] as [boolean, MessagesOfProvider])
    )
  )

  const failures = results.filter(([success]) => !success)
  const getProductId = ({ provider }: MessagesOfProvider) => provider.split('.')[1]

  const [scSAVE, nsSAVE] = process.hrtime(startSAVE)
  console.log(`TOOK ${scSAVE}s ${Math.floor(nsSAVE/1e6)}ms ${Math.floor(nsSAVE/1e3) % 1000}us TO RUN SAVE. FAILED ${failures.length}`)
  const x = failures.map(([__, messages]) => getProductId(messages))
  console.log(`------> x`, JSON.stringify([x], null, 2))
  return x
}

export default addProductTranslationsCSV