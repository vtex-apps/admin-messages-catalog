import { BrandTranslatableField } from '../../node/clients/catalogGraphQL/brand'
import { CategoryTranslatableField } from '../../node/clients/catalogGraphQL/category'
import { ProductTranslatableField } from '../../node/clients/catalogGraphQL/product'
import { SKUTranslatableField } from '../../node/clients/catalogGraphQL/sku'

export const PRODUCT_FIELD_TO_CSV_COL : Record<keyof ProductTranslatableField, string> = {
  description: '_ProductDescription',
  descriptionShort : '_ProductShortDescription',
  metaTagDescription : '_MetaTagDescription',
  name: '_ProductName',
  titleTag : '_SiteTitle',
}

export const SKU_FIELD_TO_CSV_DESC : Record<keyof SKUTranslatableField, string> = {
  name: '_SkuName',
  // nameComplete: '_SkuNameComplete',
}

export const BRAND_FIELD_TO_CSV_DESC : Record<keyof BrandTranslatableField, string> = {
  // metaTagDescription: '_MetaTagDescription',
  name: '_Name',
  // title: '_Title',
}

export const CATEGORY_FIELD_TO_CSV_DESC : Record<keyof CategoryTranslatableField, string> = {
  // metaTagDescription: '_MetaTagDescription',
  name: '_Name',
  title: '_Title',
}

export const SPECIFICATION_FIELD_TO_CSV_DESC = {
  name: '_Name',
}

export type Entity = 'product' | 'sku' | 'brand' | 'category' | 'specification'

export const ENTITY_FIELDS: Record<Entity, Record<string, string>> = {
  brand: BRAND_FIELD_TO_CSV_DESC,
  category: CATEGORY_FIELD_TO_CSV_DESC,
  product: PRODUCT_FIELD_TO_CSV_COL,
  sku: SKU_FIELD_TO_CSV_DESC,
  specification: SPECIFICATION_FIELD_TO_CSV_DESC,
}
