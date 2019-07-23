import { SaveArgs as TranslateMessageArgs } from '@vtex/api'

type MessagesOfProvider = TranslateMessageArgs['messagesByProvider'][0]

interface FailedTranslation {
  provider: string
}

type Entity = 'product' | 'sku' | 'brand' | 'category' | 'specification' 
