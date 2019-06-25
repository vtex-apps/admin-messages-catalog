import { IOClients, Service, ServiceContext } from '@vtex/api'
import addProductTranslationsCSV from './resolvers/addProductTranslationsCSV'

const SMALL_TIMEOUT_MS = 3 * 1000

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
      Mutation: {
        addProductTranslationsCSV,
      },
    },
  },
})
