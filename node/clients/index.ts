import { IOClients } from '@vtex/api'

import { Admin } from './admin'
import { Catalog } from './catalog'
import { CatalogGraphQL } from './catalogGraphQL'

export class Clients extends IOClients {
  get admin(): Admin {
    return this.getOrSet('admin', Admin)
  }

  get catalog(): Catalog {
    return this.getOrSet('catalog', Catalog)
  }

  get catalogGraphQL(): CatalogGraphQL {
    return this.getOrSet('catalogGraphQL', CatalogGraphQL)
  }
}
