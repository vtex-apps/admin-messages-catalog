import React, { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import AddProductTranslationsCSVMutation, {
  AddProductTranslationsCSVMutationFn
} from './mutations/AddProductTranslationsCSV'

const MEGA = (2 ** 20)

interface AdminMessagesProps {
  csvMutation: AddProductTranslationsCSVMutationFn
}

const AdminMessages : FC<AdminMessagesProps> = ({csvMutation}) => {

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['.csv'],
    maxSize: 3 * MEGA,
    multiple: false,
    onDrop: (f) => {
      console.log(`------> SENDING FILE`, f[0])
      csvMutation({ variables: { csv: f[0] } })
    },
  })

  return (
    <div {...getRootProps()}>
      <button>FOOBAR</button>
      <input {...getInputProps()} />
    </div>
  )
}

const Wrapper: FC = () => {
  return (
    <AddProductTranslationsCSVMutation>
      {(csvMutation: AddProductTranslationsCSVMutationFn) => {
        return <AdminMessages csvMutation={csvMutation}/>
      }}
    </AddProductTranslationsCSVMutation>
  )
}

export default Wrapper