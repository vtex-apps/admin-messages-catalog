import { IOClients, Service, ServiceContext } from '@vtex/api'
import addProductTranslations from './resolvers/addProductTranslations'

const SMALL_TIMEOUT_MS = 500

declare global {
  type Context = ServiceContext<IOClients>
}

export default new Service<IOClients>({
  clients: {
    options: {
      messagesGraphQL: {
        concurrency: 20,
        retries: 3,
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
