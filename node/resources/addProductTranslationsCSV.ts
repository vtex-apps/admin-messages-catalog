import parse from './utils/parser'

async function addProductTranslationsCSV(csv: FileUpload, _: Context): Promise<void> {
  console.log(`------> await parse()`, JSON.stringify([await parse(csv)], null, 2))
  return 
}

export default addProductTranslationsCSV