import React, { Dispatch, FC, SetStateAction } from 'react'
import { InjectedIntl } from 'react-intl'

import { Dropdown } from 'vtex.styleguide'

import { SupportedLocale } from '../typings/typings'

export function getLocaleMessage(locale: SupportedLocale) {
  switch(locale) {
    case 'en-US':
      return { id: 'admin/messages.messages-upload.pick-lang.en-us' }
    case 'pt-BR':
      return { id: 'admin/messages.messages-upload.pick-lang.pt-br' }
    case 'es-AR':
      return { id: 'admin/messages.messages-upload.pick-lang.es-ar' }
  }
}

function getLanguageOptions(intl: InjectedIntl) { 
  return [
    {
      label: intl.formatMessage(getLocaleMessage('en-US')),
      value: 'en-US',
    },
    {
      label: intl.formatMessage(getLocaleMessage('pt-BR')),
      value: 'pt-BR',
    },
    {
      label: intl.formatMessage(getLocaleMessage('es-AR')),
      value: 'es-AR',
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
          {intl.formatMessage({
            id: 'admin/messages.messages-upload.target-lang',
          })}
        </p>
      </div>
      <div className="w-40 tr">
        <Dropdown
          placeholder={intl.formatMessage({
            id: 'admin/messages.messages-upload.target-lang',
          })}
          onChange={onChangeLanguage(setLocale)}
          options={getLanguageOptions(intl)}
          value={locale || ''}
        />
      </div>
    </div>
  )
}

export default LanguagePicker