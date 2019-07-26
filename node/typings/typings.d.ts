import { SaveArgs as TranslateMessageArgs } from '@vtex/api'

type MessagesOfProvider = TranslateMessageArgs['messagesByProvider'][0]

interface FailedTranslation {
  provider: string
}

type Entity = 'product' | 'sku' | 'brand' | 'category' | 'specification' 

interface CategoryTranslatables {
  id: number
  name: string
  Title: string
  MetaTagDescription: string
}

interface Category extends CategoryTranslatables {
  hasChildren: boolean
  url: string | null
  children: Category[] | null
  fathercategoryid: number
  [key: string]: string
}

interface BrandTranslatables {
  id: number
  name: string
  title: string
  metaTagDescription: string
}

interface Brand extends BrandTranslatables {
  isActive: boolean
  imageUrl: string | null
  [key: string]: string
}

interface SpecificationTranslatables {
  Name: string
  FieldId: number
}

interface Specification extends SpecificationTranslatables {
  CategoryId: number
  IsActive: boolean
  IsStockKeepingUnit: boolean
  [key: string]: string
}

interface SpecificationValueTranslatables {
  FieldValueId: number
  Value: string
}

interface SpecificationValue extends SpecificationValueTranslatables {
  IsActive: boolean
  Position: number
  [key: string]: string
}
