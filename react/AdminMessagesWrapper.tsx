import React, {FC} from 'react'
import AdminMessages from './components/AdminMessages'
import AddProductTranslationsMutation, {
  AddProductTranslationsMutationFn,
} from './mutations/AddProductTranslations'
import GetUserEmailQuery, { EmailData } from './queries/GetUserEmail'

function extractEmail(data: EmailData | undefined): string {
  try {
    return data!.topbarData!.profile!.email || ''
  } catch {
    return ''
  }
}

const AdminMessagesWrapper: FC = () => {
  return (
    <GetUserEmailQuery>
      {result => (
        <AddProductTranslationsMutation>
          {(addProductTranslations: AddProductTranslationsMutationFn) => {
            return (
              <AdminMessages
                addProductTranslations={addProductTranslations}
                email={extractEmail(result.data)}
              />
            )
          }}
        </AddProductTranslationsMutation>
      )}
    </GetUserEmailQuery>
  )
}

export default AdminMessagesWrapper
