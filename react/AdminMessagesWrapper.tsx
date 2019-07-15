import React, { FC } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'

import { Helmet } from 'vtex.render-runtime'

import { ToastProvider } from 'vtex.styleguide'
import AdminMessages from './components/AdminMessages'
import AddProductTranslationsMutation from './mutations/AddProductTranslations'
import ExportProductCatalogMutation from './mutations/ExportProductCatalog'
import GetUserEmailQuery, { EmailData } from './queries/GetUserEmail'

const { header } = defineMessages({
  header: {
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
        <title>{intl.formatMessage(header)}</title>
      </Helmet>
      <ToastProvider positioning="parent">
        <GetUserEmailQuery>
          {result => (
            <AddProductTranslationsMutation>
              {addProductTranslations => (
                <ExportProductCatalogMutation>
                  {exportProductCatalog => (
                    <AdminMessages
                      addProductTranslations={addProductTranslations}
                      email={extractEmail(result.data)}
                      exportProductCatalog={exportProductCatalog}
                    />
                  )}
                </ExportProductCatalogMutation>
              )}
            </AddProductTranslationsMutation>
          )}
        </GetUserEmailQuery>
      </ToastProvider>
    </>
  )
}

export default injectIntl(AdminMessagesWrapper)
