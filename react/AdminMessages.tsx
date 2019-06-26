import React, { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  AddProductTranslationsCSVMutationFn
} from './mutations/AddProductTranslationsCSV'

interface AdminMessagesProps {
  csvMutation: AddProductTranslationsCSVMutationFn
}

const MEGA = (2 ** 20)

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

export default AdminMessages
