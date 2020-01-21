import { IOMessageSaveInput, MessageSaveInputV2, SaveArgs as TranslateMessageArgs } from '@vtex/api'
import { map } from 'bluebird'
import { path, prop } from 'ramda'

import { clientOptions } from '..'
import { Clients } from '../clients'

type MessagesOfProvider = TranslateMessageArgs['messagesByProvider'][0]

const saveInputV1InputToSaveInputV2 = async (clients: Clients, entity: Entity, entityId: string, srcLang: string) => {
  const fetcher = clients.catalogGraphQL[entity]
  const response = typeof fetcher === 'function' 
    ? await fetcher(entityId)
    : null
  const instance = response && prop(entity, response) as Record<string, string>
  return (message: IOMessageSaveInput): MessageSaveInputV2 | null => {
    const { id, content } = message
    const srcMessage = instance ? instance[id] : content

    if (!srcMessage) {
      if (clientOptions.default.verbose) {
        console.log(`id ${id} not available for instance of entity ${entity} of id ${entityId}`)
      }
      return null
    }

    return {
      groupContext: entity,
      srcLang,
      srcMessage,
      targetMessage: content,
    }
  }
}

async function addProductTranslations(
  messagesByProvider: MessagesOfProvider[],
  entity: Entity,
  language: string,
  ctx: Context
): Promise<FailedTranslation[]> {
  const { clients: { segment, messagesGraphQL }, clients } = ctx

  const { cultureInfo: defaultLang } = await segment.getSegment()
  console.log({messagesByProvider})

  const messagesFormattedV2Byprovider = await map(
    messagesByProvider,
    async ({provider: entityId, messages}) => {
      const toV2 = await saveInputV1InputToSaveInputV2(clients, entity, entityId, defaultLang)
      return {
        messages: messages.map(toV2).filter(x => !!x) as MessageSaveInputV2[],
        provider: entityId,
        to: language,
      }
    }
  )

  if (clientOptions.default.verbose) {
    console.log('saving', JSON.stringify(messagesFormattedV2Byprovider, null, 2))
  }

  const results = await map(
    messagesFormattedV2Byprovider,
    ({messages, provider, to}) => 
      messagesGraphQL
      .saveV2({messages, to})
      .then(success => [success, { provider }] as [boolean, { provider: string }])
      .catch(err => {
        const errors = path(['response', 'data', 'errors'], err)
        if (clientOptions.default.verbose) {
          if (errors) {
            console.log(errors)
          } else {
            console.log(err)
          }
        }
        throw err
      })
  )
  
  const failures = results.filter(([success]) => !success)
  return failures.map(([_, data]) => data)
}

export default addProductTranslations
