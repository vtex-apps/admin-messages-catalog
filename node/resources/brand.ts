import { BrandTranslatables } from '../typings/typings'
import { createXLSX, jsonToXLSXFields } from './xlsx'

const jsonToXLSXMap: Record<keyof BrandTranslatables, string> = {
  id: '_BrandId',
  metaTagDescription: '_MetaTagDescription',
  name: '_Name',
  title: '_Title',
}

export async function getBrandXLSX(ctx: Context) {
  const { clients: { catalog } } = ctx
  const brands = await catalog.exportBrands()

  return createXLSX({ Brands: brands.map(brand => jsonToXLSXFields(brand, jsonToXLSXMap)) })
}
