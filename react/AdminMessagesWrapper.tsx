import React, {FC} from 'react'

import { Helmet } from 'vtex.render-runtime'

import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import AdminMessages from './components/AdminMessages'
import AddProductTranslationsMutation from './mutations/AddProductTranslations'
import GetUserEmailQuery, { EmailData } from './queries/GetUserEmail'

const { headerMessage } = defineMessages({
  headerMessage: {
    defaultMessage: '',
    id: 'admin/messages.navigation.label',
  },
})

function extractEmail(data: EmailData | undefined): string {
  try {
    return data!.topbarData!.profile!.email || ''
  } catch {
    return ''
  }
}

const AdminMessagesWrapper: FC<InjectedIntlProps> = ({ intl }) => {
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(headerMessage)}</title>
      </Helmet>
      <GetUserEmailQuery>
        {result => (
          <AddProductTranslationsMutation>
            {addProductTranslations => {
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
    </>
  )
}

export default injectIntl(AdminMessagesWrapper)
