import { getBrandXLSX } from '../resources/brand'

export default async function brandsHandler(ctx: Context) {
  ctx.status = 200
  ctx.body = await getBrandXLSX(ctx)
  ctx.set('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ctx.set('cache-control', 'no-cache')
}
