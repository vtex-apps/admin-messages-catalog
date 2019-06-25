import { Mutation, MutationFn } from 'react-apollo'
import AddProductTranslationsCSV from '../graphql/AddProductTranslationsCSV.graphql'

type AddProductTranslationsCSVData = string[]

interface AddProductTranslationsCSVVariables {
  csv : File
  translateTo: string
}

export type AddProductTranslationsCSVMutationFn = MutationFn<
  AddProductTranslationsCSVData,
  AddProductTranslationsCSVVariables
>

class AddProductTranslationsCSVMutation extends Mutation<
  AddProductTranslationsCSVData,
  AddProductTranslationsCSVVariables
> {
  public static defaultProps = {
    mutation: AddProductTranslationsCSV,
  }
}

export default AddProductTranslationsCSVMutation

