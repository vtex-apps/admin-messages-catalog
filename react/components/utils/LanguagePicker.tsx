import React, { Dispatch, FC, SetStateAction } from 'react'
import { defineMessages, FormattedMessage, InjectedIntl } from 'react-intl'

import { Dropdown } from 'vtex.styleguide'

import { SupportedLocale } from '../../typings/typings'

const {
  english,
  pickLang,
  portuguese,
  spanish,
  targetLang,
} = defineMessages({
  english: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang.en',
  },
  pickLang: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang',
  },
  portuguese: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang.pt',
  },
  spanish: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang.es',
  },
  targetLang: {
    defaultMessage: '',
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
          {intl.formatMessage(targetLang)}
        </p>
      </div>
      <div className="w-40 tr">
        <Dropdown
          placeholder={intl.formatMessage(pickLang)}
          onChange={onChangeLanguage(setLocale)}
          options={getLanguageOptions(intl)}
          value={locale || ''}
        />
      </div>
    </div>
  )
}

export default LanguagePicker