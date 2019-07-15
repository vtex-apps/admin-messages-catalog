import { IOClients, Service, ServiceContext } from '@vtex/api'
import addProductTranslations from './resolvers/addProductTranslations'

const TRANSLATION_CONCURRENCY = 5
const TRANSLATION_RETRIES = 3
const SMALL_TIMEOUT_MS = 500

declare global {
  type Context = ServiceContext<IOClients>
}

export default new Service<IOClients>({
  clients: {
    options: {
      messagesGraphQL: {
        concurrency: TRANSLATION_CONCURRENCY,
        retries: TRANSLATION_RETRIES,
        timeout: SMALL_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers: {
      Mutation: { addProductTranslations },
    },
  },
})
