import React, { FC } from 'react'
import AddProductTranslationsCSVMutation, {
  AddProductTranslationsCSVMutationFn
} from './mutations/AddProductTranslationsCSV'

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
