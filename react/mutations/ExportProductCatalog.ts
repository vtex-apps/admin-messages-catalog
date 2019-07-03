import { Mutation, MutationFn } from 'react-apollo'
import ExportProductCatalog from '../graphql/ExportProductCatalog.graphql'

interface ExportProductCatalogData {
  exportProductCatalog: boolean
}

type ExportProductCatalogVariables = void

export type ExportProductCatalogMutationFn = MutationFn<
  ExportProductCatalogData,
  ExportProductCatalogVariables
>

class ExportProductCatalogMutation extends Mutation<
  ExportProductCatalogData,
  ExportProductCatalogVariables
> {
  public static defaultProps = {
    mutation: ExportProductCatalog,
  }
}

export default ExportProductCatalogMutation
