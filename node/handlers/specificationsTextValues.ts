import { getTextSpecificationstValues } from '../resources/productSpecs'

export default async function textSpecificationstValuesHandler(ctx: Context) {
  ctx.status = 200
  ctx.body = await getTextSpecificationstValues(ctx)
  ctx.set('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ctx.set('cache-control', 'no-cache')
}
