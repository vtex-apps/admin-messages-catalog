import addProductTranslationsCSV, { mockAddProductTranslationsCSV } from '../resources/addProductTranslationsCSV'

interface AddProductTranslationsCSVArgs {
  csv : Promise<FileUpload>
  translateTo: string
}

async function addProductTranslationsCSVResolver(
  _: unknown,
  { csv, translateTo }: AddProductTranslationsCSVArgs,
  ctx: Context
): Promise<string[]> {
  // return await addProductTranslationsCSV(await csv, translateTo, ctx)
  return await mockAddProductTranslationsCSV(await csv, translateTo, ctx)
}

export default addProductTranslationsCSVResolver
