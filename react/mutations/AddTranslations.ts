import { Mutation, MutationFn } from 'react-apollo'
import AddTranslations from '../graphql/AddTranslations.graphql'
import { MessagesOfProvider } from '../typings/typings'
import { Entity } from '../utils/constants'

interface FailedTranslation {
  provider: string
}

interface AddTranslationsData {
  addTranslations: FailedTranslation[]
}

interface AddTranslationsVariables {
  entity: Entity
  language: string
  translations : MessagesOfProvider[]
}

export type AddTranslationsMutationFn = MutationFn<
  AddTranslationsData,
  AddTranslationsVariables
>

class AddTranslationsMutation extends Mutation<
  AddTranslationsData,
  AddTranslationsVariables
> {
  public static defaultProps = {
    mutation: AddTranslations,
  }
}

export default AddTranslationsMutation
