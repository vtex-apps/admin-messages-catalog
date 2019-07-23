import React, { FC } from 'react'
import { InjectedIntl, injectIntl } from 'react-intl'

import { PageBlock } from 'vtex.styleguide'

import { StepCounterControl, TranslationDataHooks } from '../typings/typings'
import { Entity } from '../utils/constants'
import CSVUploader from './CSVUploader'
import LanguagePicker from './utils/LanguagePicker'
import StepCounter from './utils/StepCounter'
interface Props {
  entity: Entity
  intl: InjectedIntl
  stepCounterControl: StepCounterControl
  translationDataHooks: TranslationDataHooks
}

const MessagesImport: FC<Props> = ({
  entity,
  intl,
  stepCounterControl,
  translationDataHooks: {
    locale: [locale, setLocale],
    messages: [messages, setMessages],
  },
}) => {
  return (
    <PageBlock>
      <CSVUploader entity={entity} intl={intl} setMessages={setMessages} />
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

export default injectIntl(MessagesImport)
