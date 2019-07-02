import { Mutation, MutationFn } from 'react-apollo'
import AddProductTranslations from '../graphql/AddProductTranslations.graphql'
import { MessagesOfProvider } from '../typings/typings'

interface FailedTranslation {
  provider: string
}

interface AddProductTranslationsData {
  addProductTranslations: FailedTranslation[]
}

interface AddProductTranslationsVariables {
  translations : MessagesOfProvider[]
  language: string
}

export type AddProductTranslationsMutationFn = MutationFn<
  AddProductTranslationsData,
  AddProductTranslationsVariables
>

class AddProductTranslationsMutation extends Mutation<
  AddProductTranslationsData,
  AddProductTranslationsVariables
> {
  public static defaultProps = {
    mutation: AddProductTranslations,
  }
}

export default AddProductTranslationsMutation
