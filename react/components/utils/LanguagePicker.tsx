import React, { Dispatch, FC, SetStateAction } from 'react'
import { defineMessages, FormattedMessage, InjectedIntl } from 'react-intl'

import { Dropdown } from 'vtex.styleguide'

import { SupportedLocale } from '../../typings/typings'

const {
  english,
  french,
  german,
  romanian,
  bulgarian,
  pickLang,
  portuguese,
  spanish,
  targetLang,
} = defineMessages({
  english: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang.en',
  },
  french: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang.fr',
  },
  german: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang.de',
  },
  romanian: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang.ro',
  },
  bulgarian: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.pick-lang.bg',
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
  fr: french,
  pt: portuguese,
  ro: romanian,
  de: german,
  bg: bulgarian
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
    {
      label: intl.formatMessage(LOCALE_TO_MESSAGE.fr),
      value: 'fr',
    },
    {
      label: intl.formatMessage(LOCALE_TO_MESSAGE.ro),
      value: 'ro',
    },
    {
      label: intl.formatMessage(LOCALE_TO_MESSAGE.de),
      value: 'de',
    },
    {
      label: intl.formatMessage(LOCALE_TO_MESSAGE.bg),
      value: 'bg',
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