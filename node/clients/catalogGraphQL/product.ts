export const query = `
query GetProduct ($identifier: ProductUniqueIdentifier!) {
  product (identifier: $identifier) {
    name
    description
    descriptionShort: shortDescription
    titleTag: title
    metaTagDescription
  }
}
`

export interface ProductTranslatableField {
  name: string
  description?: string
  descriptionShort?: string
  titleTag?: string
  metaTagDescription?: string
}

export type Product = ProductTranslatableField
