import { getCategoryXLSX } from '../resources/category'

export default async function categoriesHandler(ctx: Context) {
  ctx.status = 200
  ctx.body = await getCategoryXLSX(ctx)
  ctx.set('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ctx.set('cache-control', 'no-cache')
}
