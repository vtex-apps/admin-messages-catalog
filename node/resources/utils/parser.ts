import parseCSV from 'csv-parse'

async function parse(csv: FileUpload): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const parser = parseCSV({ delimiter: ',' })
    const result: string[][] = []

    parser.on('readable', () => {
      while (true) {
        const line = parser.read()
        if (line === null) {
          return
        }
        result.push(line)
      }
    })
    parser.on('error', e => reject(e))
    parser.on('end', () => resolve(result))

    const stream = csv.createReadStream()
    stream.setEncoding('utf8')
    stream.pipe(parser)
  })
}

export default parse