import addProductTranslationsCSV from '../resources/addProductTranslationsCSV'

interface AddProductTranslationsCSVArgs {
  csv : Promise<FileUpload>
}

async function addProductTranslationsCSVResolver(
  _: unknown,
  { csv }: AddProductTranslationsCSVArgs,
  ctx: Context
): Promise<void> {
  return await addProductTranslationsCSV(await csv, ctx)
}

export default addProductTranslationsCSVResolver
