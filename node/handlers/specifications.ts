import { getSpecificationsXLXS } from '../resources/categorySpecs'

export default async function getSpecificationsHandler(ctx: Context) {
  ctx.status = 200
  ctx.body = await getSpecificationsXLXS(ctx)
  ctx.set('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ctx.set('cache-control', 'no-cache')
}
