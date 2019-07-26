import { pick } from 'ramda'
import { CategoryTranslatables } from '../typings/typings'
import { createXLSX, jsonToXLSXFields } from './xlsx'


const jsonToXLSXMap: Record<keyof CategoryTranslatables, string> = {
  MetaTagDescription: '_MetaTagDescription',
  Title: '_Title',
  id: '_CategoryId',
  name: '_Name',
}

const getBrandTranslatableFields = pick(Object.keys(jsonToXLSXMap) as Array<
  keyof CategoryTranslatables
>)

export async function getCategoryXLSX(ctx: Context) {
  const { clients: { catalog } } = ctx
  const categories = await catalog.exportCategories()
  const categoriesTranslatableFields = categories.map(getBrandTranslatableFields)
  const categoriesXLSX = categoriesTranslatableFields.map(category => jsonToXLSXFields(category, jsonToXLSXMap))
  return createXLSX({ Categories: categoriesXLSX })
}
