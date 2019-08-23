import { IOClients } from '@vtex/api'
import { Admin } from './admin'
import { Catalog } from './catalog'

export class Clients extends IOClients {
  get admin(): Admin {
    return this.getOrSet('admin', Admin)
  }

  get catalog(): Catalog {
    return this.getOrSet('catalog', Catalog)
  }
}
