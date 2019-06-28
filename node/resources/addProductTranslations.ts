import { SaveArgs as TranslateMessageArgs } from '@vtex/api'
import { evolve } from 'ramda'
import { FailedTranslation } from '../typings/typings'

type MessagesOfProvider = TranslateMessageArgs['messagesByProvider'][0]

function formatTranslationData(data: MessagesOfProvider): MessagesOfProvider {
  return evolve({ provider: (id: string) => `Product-id.${id}` }, data)
}

function removeDotPrefix(message : string) {
  return message.split('.').slice(1).join('.')
}

function formatFailedTransaction({ provider }: MessagesOfProvider): FailedTranslation {
   return { provider: removeDotPrefix(provider) }
}

async function addProductTranslations(messages: MessagesOfProvider[], language: string, ctx: Context): Promise<FailedTranslation[]> {
  const { messagesGraphQL } = ctx.clients

  const results = await Promise.all(
    messages.map(formatTranslationData).map(data =>
      messagesGraphQL
        .save({
          messagesByProvider: [formatTranslationData(data)],
          to: language,
        })
        .then(success => [success, data] as [boolean, MessagesOfProvider])
    )
  )

  const failures = results.filter(([success]) => !success)
  return failures.map(([_, data]) => formatFailedTransaction(data))
}

export default addProductTranslations