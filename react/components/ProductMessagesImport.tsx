import React, { FC } from 'react'
import { InjectedIntl, injectIntl } from 'react-intl'

import { PageBlock } from 'vtex.styleguide'

import { StepCounterControl, TranslationDataHooks } from '../typings/typings'
import CSVUploader from './CSVUploader'
import LanguagePicker from './LanguagePicker'
import StepCounter from './StepCounter'

interface Props {
  intl: InjectedIntl
  stepCounterControl: StepCounterControl
  translationDataHooks: TranslationDataHooks
}

const ProductMessagesImport: FC<Props> = ({
  intl,
  stepCounterControl,
  translationDataHooks: {
    locale: [locale, setLocale],
    messages: [messages, setMessages],
  },
}) => {
  return (
    <PageBlock>
      <CSVUploader intl={intl} setMessages={setMessages} />
      <LanguagePicker
        intl={intl}
        locale={locale}
        setLocale={setLocale}
      />
      <StepCounter
        {...stepCounterControl}
        intl={intl}
        nextDisabled={!locale || !messages}
      />
    </PageBlock>
  )
}

export default injectIntl(ProductMessagesImport)
