import { getCategorySpecsXLXS } from '../resources/categorySpecs'

export default async function categorySpecsHandler(ctx: Context) {
  ctx.status = 200
  ctx.body = await getCategorySpecsXLXS(ctx)
  ctx.set('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ctx.set('cache-control', 'no-cache')
}
