import { Service, ServiceContext } from '@vtex/api'
import { Clients } from './clients'
import routes from './handlers'
import addTranslations from './resolvers/addTranslations'
import exportProductCatalog from './resolvers/exportProductCatalog'

const TRANSLATION_CONCURRENCY = 5
const TRANSLATION_RETRIES = 3

const SMALL_TIMEOUT_MS = 500
const HUGE_TIMEOUT_MS = 5000

declare global {
  type Context = ServiceContext<Clients>
}

export default new Service<Clients>({
  clients: {
    implementation: Clients,
    options: {
      admin: { timeout: HUGE_TIMEOUT_MS },
      messagesGraphQL: {
        concurrency: TRANSLATION_CONCURRENCY,
        retries: TRANSLATION_RETRIES,
        timeout: SMALL_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers: {
      Mutation: { addTranslations, exportProductCatalog },
    },
  },
  routes,
})
