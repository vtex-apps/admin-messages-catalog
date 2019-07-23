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
  const categories = await catalog.exportCategories()
  const categoriesTranslatableFields = categories.map(getBrandTranslatableFields)
  const categoriesXLSX = categoriesTranslatableFields.map(category => jsonToXLSXFields(category, jsonToXLSXField))
  return createXLSX(categoriesXLSX, 'Categories')
}
