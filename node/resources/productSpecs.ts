import { chain, uniq, unnest } from 'ramda'
import { Catalog } from '../clients/catalog'
import { Category, ProductSpecification, SpecificationFields } from '../typings/typings'
import { getCategoriesSpecifications } from './categorySpecs'
import { isProductSpecification, range } from './utils'
import { createXLSX, jsonToXLSXFields } from './xlsx'

// Limit of the API
const BATCH_SIZE = 51

const specificationToXLSXMap: Record<keyof ProductSpecification, string> = {
  Id: '_SpecificationId',
  Name: '_SpecificationName',
  Value: '_SpecificationValue',
  productId: '_ProductId',
}

async function getCategoryProducts({ id }: Category, catalog: Catalog): Promise<string[]> {
  const {
    range: { total },
    data: firstData,
  } = await catalog.getProductAndSkuByCategory(id, 1, BATCH_SIZE) 

  const froms = range(BATCH_SIZE + 1, total, BATCH_SIZE)

  const results = await Promise.all(
    froms.map(from =>
      catalog.getProductAndSkuByCategory(id, from, from + BATCH_SIZE - 1)
    )
  )

  return [
    ...Object.keys(firstData),
    ...chain(({ data }) => Object.keys(data), results),
  ]
}

async function getProductsSpecificationsFromCategories(
  categories: Category[],
  { clients: { catalog } }: Context
): Promise<ProductSpecification[]> {
  const products = await Promise.all(
    categories.map(category => getCategoryProducts(category, catalog))
  )
    .then(productsByCategory => unnest(productsByCategory))
    .then(repeatedProducts => uniq(repeatedProducts))

  const specificationsByProduct = await Promise.all(
    products.map(async productId => {
      const specifications = await catalog.getProductSpecification(productId)
      return specifications.map(specification => ({
        ...specification,
        productId: parseInt(productId, 10),
      }))
    })
  )

  return unnest(specificationsByProduct)
}

async function getCategoriesSpecificationsFieldsById(
  categories: Category[],
  ctx: Context
): Promise<Record<string, SpecificationFields>> {
  const {
    clients: { catalog },
  } = ctx
  const specifications = await getCategoriesSpecifications(categories, ctx)
  const specificationsFieldsById: Record<string, SpecificationFields> = {}

  await Promise.all(
    specifications.map(async ({ FieldId }) => {
      specificationsFieldsById[FieldId] = await catalog.getSpecificationFields(
        FieldId
      )
    })
  )

  return specificationsFieldsById
}

export async function getProductsSpecifications(ctx: Context) {
  const { clients: { catalog } } = ctx
  const categories = await catalog.exportCategories()

  const [specifications, specificationFieldById] = await Promise.all([
    getProductsSpecificationsFromCategories(categories, ctx),
    getCategoriesSpecificationsFieldsById(categories, ctx),
  ])

  const productSpecifications = specifications.filter(({ Id }) =>
    isProductSpecification(specificationFieldById[Id])
  )

  // Product specifications are supposed to have ONLY ONE item on the Value list
  const normalizedSpecifications = productSpecifications.map(
    ({ Value: [Value], ...specification }) => ({
      ...specification,
      Value,
    })
  )

  const specificationsXLSX = normalizedSpecifications.map(specification =>
    jsonToXLSXFields(specification, specificationToXLSXMap)
  )

  return createXLSX({
    'Product Specifications': specificationsXLSX,
  })
}