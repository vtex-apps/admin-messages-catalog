import React, {FC} from 'react'
import AdminMessages from './AdminMessages'
import AddProductTranslationsCSVMutation, {
  AddProductTranslationsCSVMutationFn,
} from './mutations/AddProductTranslationsCSV'

const Wrapper: FC = () => {
  return (
    <AddProductTranslationsCSVMutation>
      {(csvMutation: AddProductTranslationsCSVMutationFn) => {
        return <AdminMessages />
      }}
    </AddProductTranslationsCSVMutation>
  )
}

export default Wrapper
