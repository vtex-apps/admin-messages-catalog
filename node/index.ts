import { IOClients, Service, ServiceContext } from '@vtex/api'
import addProductTranslationsCSV from './resolvers/addProductTranslationsCSV'

const SMALL_TIMEOUT_MS = 500

declare global {
  type Context = ServiceContext<IOClients>
}

export default new Service({
  clients: {
    options: {
      messagesGraphQL: {
        concurrency: 50,
        retries: 2,
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
