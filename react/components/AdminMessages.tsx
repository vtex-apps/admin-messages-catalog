import React, { FC, useState } from 'react'
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl'

import { Layout, PageHeader } from 'vtex.styleguide'

import { AddTranslationsMutationFn } from '../mutations/AddTranslations'
import { ExportProductCatalogMutationFn } from '../mutations/ExportProductCatalog'
import { MessagesOfProvider, StepCounterControl, SupportedLocale } from '../typings/typings'
import { Entity } from '../utils/constants'
import MessagesExport from './MessagesExport'
import MessagesImport from './MessagesImport'
import MessagesProgress from './MessagesProgress'

const TOTAL_STEPS = 3

const title = defineMessages({
  brand: { defaultMessage: '', id: 'admin/messages.header.brand.title' },
  category: { defaultMessage: '', id: 'admin/messages.header.category.title' },
  product: { defaultMessage: '', id: 'admin/messages.header.product.title' },
  sku: { defaultMessage: '', id: 'admin/messages.header.sku.title' },
  specification: { defaultMessage: '', id: 'admin/messages.header.specification.title' },
})


interface Props {
  addProductTranslations: AddTranslationsMutationFn
  email: string
  entity: Entity
  exportProductCatalog: ExportProductCatalogMutationFn
  intl: InjectedIntl
}

const AdminMessages: FC<Props> = ({
  addProductTranslations,
  email,
  entity,
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

  const stepCounterControl: StepCounterControl = {
    back,
    current: step,
    next,
    total: TOTAL_STEPS,
  }

  const done = () => {
    setLocale(null)
    setMessages(null)
    setStep(1)
  }

  return (
    <div className="min-vh-100 bg-muted-5">
      <Layout
        pageHeader={<PageHeader title={intl.formatMessage(title[entity])} />}
      >
        {step === 1 && (
          <MessagesExport
            email={email}
            entity={entity}
            exportCSV={exportProductCatalog}
            stepCounterControl={stepCounterControl}
          />
        )}
        {step === 2 && (
          <MessagesImport
            entity={entity}
            stepCounterControl={stepCounterControl}
            translationDataHooks={translationDataHooks}
          />
        )}
        {step === 3 && (
          <MessagesProgress
            addTranslations={addProductTranslations}
            done={done}
            entity={entity}
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
