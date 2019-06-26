import React, { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import AddProductTranslationsMutation, { AddProductTranslationsMutationFn } from './mutations/AddProductTranslations'
import { getMessages } from './utils/csv'

const MEGA = (2 ** 20)

interface AdminMessagesProps {
  csvMutation: AddProductTranslationsMutationFn
}

const AdminMessages : FC<AdminMessagesProps> = ({csvMutation}) => {

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['.csv'],
    maxSize: 3 * MEGA,
    multiple: false,
    onDrop: async (f) => {
      const translations = await getMessages(f[0])
      await csvMutation({ variables: { translations, translateTo: 'en-US' } })
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
    <AddProductTranslationsMutation>
      {(csvMutation: AddProductTranslationsMutationFn) => {
        return <AdminMessages csvMutation={csvMutation}/>
      }}
    </AddProductTranslationsMutation>
  )
}

export default Wrapper