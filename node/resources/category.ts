import { pick } from 'ramda'
import { createXLSX, jsonToXLSXFields } from './xlsx'

enum CategoriesTranslatableField {
  metaTagDescription = 'MetaTagDescription',
  name = 'name',
  title = 'Title',
}

const getBrandTranslatableFields = pick(Object.values(CategoriesTranslatableField))

type CategoriesTranslatables = Record<CategoriesTranslatableField, string>

const jsonToXLSXField: CategoriesTranslatables = {
  MetaTagDescription: '_MetaTagDescription',
  Title: '_Title',
  name: '_Name',
}

export async function getCategoryXLSX(ctx: Context) {
  const { clients: { catalog } } = ctx
  const brands = await catalog.exportCategories() as Array<Record<string, string>>
  const brandsTranslatableFields = brands.map(getBrandTranslatableFields)
  const xlsxBrand = brandsTranslatableFields.map(brand => jsonToXLSXFields(brand, jsonToXLSXField))
  return createXLSX(xlsxBrand, 'Categories')
}