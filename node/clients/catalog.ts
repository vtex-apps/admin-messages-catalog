import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import { Brand, Category, ProductAndSkuByCategoryResult, ProductSpecification, Specification, SpecificationFields, SpecificationValue } from '../typings/typings'

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

  public exportBrands = (): Promise<Brand[]> =>
    this.http.get('pvt/brand/list')

  public exportCategories = (): Promise<Category[]> =>
    this.http.get('pub/category/listAll')

  public getSpecificationsByCategory = (id: number): Promise<Specification[]> =>
    this.http.get(`pub/specification/field/listByCategoryId/${id}`)

  public getSpecificationsTreeByCategory = (id: number): Promise<Specification[]> =>
    this.http.get(`pub/specification/field/listTreeByCategoryId/${id}`)

  public getSpecificationValues = (id: number): Promise<SpecificationValue[]> =>
    this.http.get(`pub/specification/fieldvalue/${id}`)

  public getSpecificationFields = (id: number): Promise<SpecificationFields> =>
    this.http.get(`pub/specification/fieldGet/${id}`)

  public getProductAndSkuByCategory = (categoryId: number, from: number, to: number): Promise<ProductAndSkuByCategoryResult> =>
    this.http.get(`pvt/products/GetProductAndSkuIds?categoryId=${categoryId}&_from=${from}&_to=${to}`)

  public getProductSpecification = (id: string): Promise<ProductSpecification[]> =>
    this.http.get(`pvt/products/${id}/specification`)

}
