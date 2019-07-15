import React, { FC, useState } from 'react'
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl'

import { Layout, PageHeader } from 'vtex.styleguide'

import { AddProductTranslationsMutationFn } from '../mutations/AddProductTranslations'
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
  intl: InjectedIntl
  addProductTranslations: AddProductTranslationsMutationFn
  email: string
}

const AdminMessages: FC<Props> = ({ addProductTranslations, email, intl }) => {
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
        {step === 1 ? (
          <ProductMessagesExport
            email={email}
            stepCounterControl={stepCounterControl}
          />
        ) : null}
        {step === 2 ? (
          <ProductMessagesImport
            stepCounterControl={stepCounterControl}
            translationDataHooks={translationDataHooks}
          />
        ) : null}
        {step === 3 ? (
          <ProductMessagesProgress
            addProductTranslations={addProductTranslations}
            done={done}
            locale={locale!}
            stepCounterControl={stepCounterControl}
            messages={messages!}
            setMessages={setMessages}
          />
        ) : null}
      </Layout>
    </div>
  )
}

export default injectIntl(AdminMessages)
