export const query = `
query GetCategory($id: ID!) {
  category (id: $id) {
    name
    title
    parentCategoryId
    description
    isActive
    globalCategoryId
    score
  }
}
`

export interface CategoryTranslatableField {
  name: string
  title?: string
}

export type Category = CategoryTranslatableField
