import addProductTranslations from '../resources/addProductTranslations'
import { MessagesOfProvider } from '../typings/typings'

interface AddProductTranslationsCSVArgs {
  translations : MessagesOfProvider[]
  translateTo: string
}

async function addProductTranslationsResolver(
  _: unknown,
  { translateTo, translations }: AddProductTranslationsCSVArgs,
  ctx: Context
): Promise<string[]> {
  return await addProductTranslations(translations, translateTo, ctx)
}

export default addProductTranslationsResolver
