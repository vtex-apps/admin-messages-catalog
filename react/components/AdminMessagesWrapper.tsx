import React, { FC, useState } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'

import { Helmet } from 'vtex.render-runtime'

import { ToastProvider } from 'vtex.styleguide'
import AddTranslationsMutation from '../mutations/AddTranslations'
import ExportProductCatalogMutation from '../mutations/ExportProductCatalog'
import GetUserEmailQuery, { EmailData } from '../queries/GetUserEmail'
import { Entity } from '../utils/constants'
import AdminMessages from './AdminMessages'

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

interface Props extends InjectedIntlProps {
  entity: Entity
}

const AdminMessagesWrapper: FC<Props> = ({ entity, intl }) => {
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(header)}</title>
      </Helmet>
      <ToastProvider positioning="parent">
        <GetUserEmailQuery>
          {result => (
            <AddTranslationsMutation>
              {addProductTranslations => (
                <ExportProductCatalogMutation>
                  {exportProductCatalog => (
                    <AdminMessages
                      addProductTranslations={addProductTranslations}
                      email={extractEmail(result.data)}
                      entity={entity}
                      exportProductCatalog={exportProductCatalog}
                    />
                  )}
                </ExportProductCatalogMutation>
              )}
            </AddTranslationsMutation>
          )}
        </GetUserEmailQuery>
      </ToastProvider>
    </>
  )
}

export default injectIntl(AdminMessagesWrapper)
