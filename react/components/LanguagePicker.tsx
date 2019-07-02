import React, { Dispatch, FC, SetStateAction } from 'react'
import { defineMessages, FormattedMessage, InjectedIntl } from 'react-intl'

import { Dropdown } from 'vtex.styleguide'

import { SupportedLocale } from '../typings/typings'

const {
  english,
  pickLangMessage,
  portuguese,
  spanish,
  targetLangMessage,
} = defineMessages({
  english: {
    defaultMessage: 'English',
    id: 'admin/messages.messages-upload.pick-lang.en',
  },
  pickLangMessage: {
    defaultMessage: 'Pick a language',
    id: 'admin/messages.messages-upload.pick-lang',
  },
  portuguese: {
    defaultMessage: 'Portuguese',
    id: 'admin/messages.messages-upload.pick-lang.pt',
  },
  spanish: {
    defaultMessage: 'Spanish',
    id: 'admin/messages.messages-upload.pick-lang.es',
  },
  targetLangMessage: {
    defaultMessage: 'Target language',
    id: 'admin/messages.messages-upload.target-lang',
  },
})

export const LOCALE_TO_MESSAGE: Record<
  SupportedLocale,
  FormattedMessage.MessageDescriptor
> = {
  en: english,
  es: spanish,
  pt: portuguese,
}

function getLanguageOptions(intl: InjectedIntl) { 
  return [
    {
      label: intl.formatMessage(LOCALE_TO_MESSAGE.en),
      value: 'en',
    },
    {
      label: intl.formatMessage(LOCALE_TO_MESSAGE.pt),
      value: 'pt',
    },
    {
      label: intl.formatMessage(LOCALE_TO_MESSAGE.es),
      value: 'es',
    },
  ]
}

const onChangeLanguage = (setLocale: (lang: SupportedLocale) => void) => (
  _: React.ChangeEvent,
  value: string
) => setLocale(value as SupportedLocale)


interface Props {
  intl: InjectedIntl
  locale: SupportedLocale | null
  setLocale: Dispatch<SetStateAction<SupportedLocale | null>>
}

const LanguagePicker: FC<Props> = ({ intl, locale, setLocale }) => {
  return (
    <div className="flex items-center mv7">
      <div className="flex-grow-1">
        <p className="mb1 mt0">
          {intl.formatMessage(targetLangMessage)}
        </p>
      </div>
      <div className="w-40 tr">
        <Dropdown
          placeholder={intl.formatMessage(pickLangMessage)}
          onChange={onChangeLanguage(setLocale)}
          options={getLanguageOptions(intl)}
          value={locale || ''}
        />
      </div>
    </div>
  )
}

export default LanguagePicker