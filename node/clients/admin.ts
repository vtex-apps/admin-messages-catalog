import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export class Admin extends ExternalClient {
  public constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `https://${context.account}.vtexcommercestable.com.br/admin/API/`,
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

  public exportCatalogToEmail = (email: string) =>
    this.http.post(`StockKeepingUnitReport/ExportToEmail/`, {
      Email: email,
      Filters: {
        StoreId: 0,
      },
      Locale: 'en-US',
    })
}
