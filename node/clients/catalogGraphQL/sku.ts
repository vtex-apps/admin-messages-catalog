export const query = `
query GetSKU ($identifier: SKUUniqueIdentifier!) {
  sku (identifier: $identifier) {
    name
  }
}
`

export interface SKUTranslatableField {
  name: string
}

export type SKU = SKUTranslatableField
