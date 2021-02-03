declare global {
  declare module '*.graphql' {
    import { DocumentNode } from 'graphql'

    const value: DocumentNode
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
  locale: StateHook<SupportedLocale | null>
  messages: StateHook<MessagesOfProvider[] | null>
}

export interface ButtonProps {
  disabled: boolean
}

export type SupportedLocale = 'en' | 'pt' | 'es' | 'fr' | 'bg' | 'ro' | 'de'
 