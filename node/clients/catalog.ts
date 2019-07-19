import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

/** Catalog API
 * Docs: https://documenter.getpostman.com/view/845/catalogsystem-102/Hs44
 */
export class Catalog extends ExternalClient {
  public constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/catalog_system/`,
      context,
      {
        ...options,
        headers: {
          ...(options && options.headers),
          ...(context.adminUserAuthToken
            ? { VtexIdclientAutCookie: context.adminUserAuthToken }
            : null),
        },
      }
    )
  }

  public exportBrands = () =>
    this.http.get('pvt/brand/list')

  public exportCategories = () =>
    this.http.get('pub/category/listAll')
}
