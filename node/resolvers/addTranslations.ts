import addTranslations from '../resources/addTranslations'
import { Entity, FailedTranslation, MessagesOfProvider } from '../typings/typings'

interface AddTranslationsArgs {
  entity: Entity
  language: string
  translations : MessagesOfProvider[]
}

async function addTranslationsResolver(
  _: unknown,
  { entity, language, translations }: AddTranslationsArgs,
  ctx: Context
): Promise<FailedTranslation[]> {
  return await addTranslations(translations, entity, language, ctx)
}

export default addTranslationsResolver
