import { IOClients } from '@vtex/api'
import { Admin } from './admin'

export class Clients extends IOClients {
  get admin(): Admin {
    return this.getOrSet('admin', Admin)
  }
}