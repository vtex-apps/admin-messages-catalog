import { Mutation, MutationFn } from 'react-apollo'
import AddProductTranslations from '../graphql/AddProductTranslations.graphql'
import { MessagesOfProvider } from '../typings/global'

type AddProductTranslationsData = string[]

interface AddProductTranslationsVariables {
  translations : MessagesOfProvider[]
  translateTo: string
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

