type StreamFunction = () => import('stream').Readable

interface FileUpload {
  createReadStream: StreamFunction
  filename: string
  mimetype: string
  encoding: string
}