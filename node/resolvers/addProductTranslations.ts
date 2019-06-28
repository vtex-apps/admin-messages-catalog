import addProductTranslations from '../resources/addProductTranslations'
import { FailedTranslation, MessagesOfProvider } from '../typings/typings'

interface AddProductTranslationsArgs {
  translations : MessagesOfProvider[]
  language: string
}

async function addProductTranslationsResolver(
  _: unknown,
  { language, translations }: AddProductTranslationsArgs,
  ctx: Context
): Promise<FailedTranslation[]> {
  return await addProductTranslations(translations, language, ctx)
}

export default addProductTranslationsResolver
