export enum ProductTranslatableField {
  description = 'description',
  descriptionShort = 'descriptionShort',
  keywords = 'keywords',
  metaTagDescription = 'metaTagDescription',
  name = 'name',
  titleTag = 'titleTag',
}

export const PRODUCT_FIELD_TO_CSV_DESC : Record<ProductTranslatableField, string> = {
  description: '_ProductDescription',
  descriptionShort : '_ProductShortDescription',
  keywords : '_Keywords',
  metaTagDescription : '_MetaTagDescription',
  name: '_ProductName',
  titleTag : '_SiteTitle',
}

export type Entity = 'product' | 'sku' | 'brand' | 'category' | 'specification'

export const ENTITY_FIELDS: Record<Entity, Record<string, string>> = {
  brand: {},
  category: {},
  product: PRODUCT_FIELD_TO_CSV_DESC,
  sku: {},
  specification: {},
}