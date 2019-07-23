import { pick } from 'ramda'
import { createXLSX, jsonToXLSXFields } from './xlsx'

enum BrandTranslatableField {
  metaTagDescription = 'metaTagDescription',
  name = 'name',
  title = 'title',
}

const getBrandTranslatableFields = pick(Object.values(BrandTranslatableField))

type BrandTranslatables = Record<BrandTranslatableField, string>

const jsonToXLSXField: BrandTranslatables = {
  metaTagDescription: '_MetaTagDescription',
  name: '_Name',
  title: '_Title',
}

export async function getBrandXLSX(ctx: Context) {
  const { clients: { catalog } } = ctx
  const brands = await catalog.exportBrands()
  const brandsTranslatableFields = brands.map(getBrandTranslatableFields)
  const brandXLSX = brandsTranslatableFields.map(brand => jsonToXLSXFields(brand, jsonToXLSXField))
  return createXLSX(brandXLSX, 'Brands')
}
