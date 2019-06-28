declare global {
  declare module '*.graphql' {
    import { DocumentNode } from 'graphql'

    const value: DocumentNode
    export default value
  }
}

interface TranslationMessage {
  id: string
  content: string
  description?: string
}

interface MessagesOfProvider {
  messages: TranslationMessage[]
  provider: string
}

export interface MessagesTranslation {
    to: string
    messagesByProvider: MessagesOfProvider[]
}