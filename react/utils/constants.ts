export enum ProductTranslatableField {
  description = 'description',
  descriptionShort = 'descriptionShort',
  keywords = 'keywords',
  metaTagDescription = 'metaTagDescription',
  name = 'name',
  titleTag = 'titleTag',
}

export const PRODUCT_FIELD_TO_CSV_COL : Record<ProductTranslatableField, string> = {
  description: '_ProductDescription',
  descriptionShort : '_ProductShortDescription',
  keywords : '_Keywords',
  metaTagDescription : '_MetaTagDescription',
  name: '_ProductName',
  titleTag : '_SiteTitle',
}

export enum SKUTranslatableField {
  name = 'name',
  nameComplete = 'nameComplete',
}

export const SKU_FIELD_TO_CSV_DESC : Record<SKUTranslatableField, string> = {
  name: '_SkuName',
  nameComplete: '_SkuNameComplete',
}

enum BrandTranslatableField {
  metaTagDescription = 'metaTagDescription',
  name = 'name',
  title = 'title',
}

export const BRAND_FIELD_TO_CSV_DESC : Record<BrandTranslatableField, string> = {
  metaTagDescription: '_MetaTagDescription',
  name: '_Name',
  title: '_Title',
}

enum CategoryTranslatableField {
  metaTagDescription = 'MetaTagDescription',
  name = 'name',
  title = 'Title',
}

export const CATEGORY_FIELD_TO_CSV_DESC : Record<CategoryTranslatableField, string> = {
  MetaTagDescription: '_MetaTagDescription',
  Title: '_Title',
  name: '_Name',
}

export type Entity = 'product' | 'sku' | 'brand' | 'category' | 'specification'

export const ENTITY_FIELDS: Record<Entity, Record<string, string>> = {
  brand: BRAND_FIELD_TO_CSV_DESC,
  category: CATEGORY_FIELD_TO_CSV_DESC,
  product: PRODUCT_FIELD_TO_CSV_COL,
  sku: SKU_FIELD_TO_CSV_DESC,
  specification: {},
}
