import React, { FC, useState } from 'react'
import { InjectedIntl, injectIntl } from 'react-intl'

import { Layout, PageHeader } from 'vtex.styleguide'

import { AddProductTranslationsMutationFn } from '../mutations/AddProductTranslations'
import { MessagesOfProvider, StepCounterControl } from '../typings/typings'
import ProductMessagesExport from './ProductMessagesExport'
import ProductMessagesImport from './ProductMessagesImport'

const TOTAL_STEPS = 3

interface Props {
  intl: InjectedIntl
  addProductTranslations: AddProductTranslationsMutationFn
  email: string
}

const AdminMessages: FC<Props> = ({ email, intl }) => {
  const [step, setStep] = useState(1)

  const translationDataHooks = {
    language: useState(''),
    messages: useState<MessagesOfProvider[] | null>(null),
  }

  const next = () => setStep(step + 1)
  const back = () => setStep(step - 1)

  const stepCounterControl = ({
    back,
    current: step.toString(),
    next,
    total: TOTAL_STEPS.toString(),
  } as unknown) as StepCounterControl

  return (
    <div className="min-vh-100 bg-muted-5">
      <Layout
        pageHeader={
          <PageHeader
            title={intl.formatMessage({ id: 'admin/messages.headerTitle' })}
          />
        }
      >
        {step !== 1 ? null : (
          <ProductMessagesExport
            email={email}
            stepCounterControl={stepCounterControl}
          />
        )}
        {step !== 2 ? null : (
          <ProductMessagesImport
            stepCounterControl={stepCounterControl}
            translationDataHooks={translationDataHooks}
          />
        )}
      </Layout>
    </div>
  )
}

export default injectIntl(AdminMessages)
