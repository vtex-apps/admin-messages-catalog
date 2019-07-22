import { SaveArgs as TranslateMessageArgs } from '@vtex/api'
import { evolve } from 'ramda'
import { Entity, FailedTranslation } from '../typings/typings'

type MessagesOfProvider = TranslateMessageArgs['messagesByProvider'][0]

const entityProvider: Record<Entity, string> = {
  brand: 'Brand-id',
  category: 'Category-id',
  product: 'Product-id',
  sku: 'SKU-id',
  specification: 'Specification-id',
}

function formatTranslationData(data: MessagesOfProvider, entity: Entity): MessagesOfProvider {
  return evolve({ provider: (id: string) => `${entityProvider[entity]}.${id}` }, data)
}

async function addProductTranslations(
  messages: MessagesOfProvider[],
  entity: Entity,
  language: string,
  ctx: Context
): Promise<FailedTranslation[]> {
  const { messagesGraphQL } = ctx.clients

  const results = await Promise.all(
    messages.map(data =>
      messagesGraphQL
        .save({
          messagesByProvider: [formatTranslationData(data, entity)],
          to: language,
        })
        .then(success => [success, data] as [boolean, MessagesOfProvider])
    )
  )

  const failures = results.filter(([success]) => !success)
  return failures.map(([_, data]) => data)
}

export default addProductTranslations
