import { SaveArgs as TranslateMessageArgs } from '@vtex/api'

export type ID = string
export type Float = number
export type Int = number

declare global {

  type MessagesOfProvider = TranslateMessageArgs['messagesByProvider'][0]

  interface FailedTranslation {
    provider: string
  }

  type Entity = 'product' | 'sku' | 'brand' | 'category'  // | 'specification' 

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
  }

  interface SpecificationTranslatables {
    Name: string
    FieldId: number
  }

  interface Specification extends SpecificationTranslatables {
    CategoryId: number
    IsActive: boolean
    IsStockKeepingUnit: boolean
  }

  interface SpecificationValueTranslatables {
    FieldValueId: number
    Value: string
  }

  interface SpecificationValue extends SpecificationValueTranslatables {
    IsActive: boolean
    Position: number
  }

  interface SkusByProduct {
    [productId: number]: [number]
  }

  interface ProductAndSkuByCategoryResult {
    data: SkusByProduct
    range: {
      total: number
      from: number
      to: number
    }
  }

  interface ProductSpecification {
    productId: number | null
    Value: string[]
    Id: number
    Name: string
  }

  interface SpecificationFields {
    Name: string
    CategoryId: number | null
    FieldId: number
    IsActive: boolean
    IsRequired: boolean
    FieldTypeId: number
    FieldTypeName: string
    FieldValueId: number | null
    Description: string
    IsStockKeepingUnit: boolean
    IsFilter: boolean
    IsOnProductDetails: boolean
    Position: number
    IsWizard: boolean
    IsTopMenuLinkActive: boolean
    IsSideMenuLinkActive: boolean
    DefaultValue: string | number | null
    FieldGroupId: number
    FieldGroupName: string
  }
}