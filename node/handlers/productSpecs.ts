import { getProductsSpecifications } from '../resources/productSpecs'

export default async function productSpecsHandler(ctx: Context) {
  ctx.status = 200
  ctx.body = await getProductsSpecifications(ctx)
  ctx.set('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ctx.set('cache-control', 'no-cache')
}
