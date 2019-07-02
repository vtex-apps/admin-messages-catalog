declare global {
  declare module '*.graphql' {
    import { DocumentNode } from 'graphql'

    const value: DocumentNode
    export default value
  }

  declare module 'vtex.styleguide' {
    const value: any
    export default value
  }
}

export interface TranslationMessage {
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

export interface StepCounterControl {
  current: number
  total: number
  next: () => void
  back: () => void
}

type StateHook<T> = [T, Dispatch<SetStateAction<T>>]

export interface TranslationDataHooks {
  language: StateHook<string>
  messages: StateHook<MessagesOfProvider[] | null>
}

export interface ButtonProps {
  disabled: boolean
}