import React, { FC, useState } from 'react'
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl'

import { Layout, PageHeader, ShowToastFunction } from 'vtex.styleguide'

import { AddProductTranslationsMutationFn } from '../mutations/AddProductTranslations'
import { ExportProductCatalogMutationFn } from '../mutations/ExportProductCatalog'
import { MessagesOfProvider, StepCounterControl, SupportedLocale } from '../typings/typings'
import ProductMessagesExport from './ProductMessagesExport'
import ProductMessagesImport from './ProductMessagesImport'
import ProductMessagesProgress from './ProductMessagesProgress'

const TOTAL_STEPS = 3

const { titleMessage } = defineMessages({
  titleMessage: {
    defaultMessage: '',
    id: 'admin/messages.headerTitle',
  },
})

interface Props {
  addProductTranslations: AddProductTranslationsMutationFn
  email: string
  exportProductCatalog: ExportProductCatalogMutationFn
  intl: InjectedIntl
}

const AdminMessages: FC<Props> = ({
  addProductTranslations,
  email,
  exportProductCatalog,
  intl,
}) => {
  const [step, setStep] = useState(1)

  const translationDataHooks = {
    locale: useState<SupportedLocale | null>(null),
    messages: useState<MessagesOfProvider[] | null>(null),
  }

  const {
    locale: [locale, setLocale],
    messages: [messages, setMessages],
  } = translationDataHooks

  const next = () => setStep(step + 1)
  const back = () => setStep(step - 1)

  const done = () => {
    setLocale(null)
    setMessages(null)
    setStep(1)
  }

  const stepCounterControl: StepCounterControl = {
    back,
    current: step,
    next,
    total: TOTAL_STEPS,
  }

  return (
    <div className="min-vh-100 bg-muted-5">
      <Layout
        pageHeader={<PageHeader title={intl.formatMessage(titleMessage)} />}
      >
        {step === 1 && (
          <ProductMessagesExport
            email={email}
            exportProductCatalog={exportProductCatalog}
            stepCounterControl={stepCounterControl}
          />
        )}
        {step === 2 && (
          <ProductMessagesImport
            stepCounterControl={stepCounterControl}
            translationDataHooks={translationDataHooks}
          />
        )}
        {step === 3 && (
          <ProductMessagesProgress
            addProductTranslations={addProductTranslations}
            done={done}
            locale={locale!}
            stepCounterControl={stepCounterControl}
            messages={messages!}
            setMessages={setMessages}
          />
        )}
      </Layout>
    </div>
  )
}

export default injectIntl(AdminMessages)
