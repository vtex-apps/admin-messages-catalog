export const query = `
query GetBrand($id: ID!) {
  brand (id: $id) {
    name
    text
    keywords
    siteTitle
    active
    menuHome
    adWordsRemarketingCode
    lomadeeCampaignCode
    score
  }
}
`

export interface BrandTranslatableField {
  name: string
}

export type Brand = BrandTranslatableField