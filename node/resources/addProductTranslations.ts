import { SaveArgs as TranslateMessageArgs } from '@vtex/api'
import { evolve } from 'ramda'

type MessagesOfProvider = TranslateMessageArgs['messagesByProvider'][0]

function formatTranslationData(data: MessagesOfProvider): MessagesOfProvider {
  return evolve({ provider: (id: string) => `Product-id.${id}` }, data)
}

function getProductId({ provider }: MessagesOfProvider) {
   return provider.split('.')[1]
}

async function addProductTranslations(messages: MessagesOfProvider[], translateTo: string, ctx: Context): Promise<string[]> {
  const { messagesGraphQL } = ctx.clients

  const results = await Promise.all(
    messages.map(formatTranslationData).map(data =>
      messagesGraphQL
        .save({
          messagesByProvider: [formatTranslationData(data)],
          to: translateTo,
        })
        .then(success => [success, data] as [boolean, MessagesOfProvider])
    )
  )

  const failures = results
  return failures.map(([_, data]) => getProductId(data))
}

export default addProductTranslations