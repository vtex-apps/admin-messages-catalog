import React, { Dispatch, FC, SetStateAction } from 'react'
import { InjectedIntl } from 'react-intl'

import { Dropdown } from 'vtex.styleguide'

function getLanguageOptions(intl: InjectedIntl) { 
  return [
    {
      label: intl.formatMessage({
        id: 'admin/messages.messages-upload.pick-lang.en-us',
      }),
      value: 'en-US',
    },
    {
      label: intl.formatMessage({
        id: 'admin/messages.messages-upload.pick-lang.pt-br',
      }),
      value: 'pt-BR',
    },
    {
      label: intl.formatMessage({
        id: 'admin/messages.messages-upload.pick-lang.es-ar',
      }),
      value: 'es-AR',
    },
  ]
}

const onChangeLanguage = (setLanguage: (lang: string) => void) => (
  _: React.ChangeEvent,
  value: string
) => setLanguage(value)


interface Props {
  intl: InjectedIntl
  language: string
  setLanguage: Dispatch<SetStateAction<string>>
}

const LanguagePicker: FC<Props> = ({ intl, language, setLanguage }) => {
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
          onChange={onChangeLanguage(setLanguage)}
          options={getLanguageOptions(intl)}
          value={language}
        />
      </div>
    </div>
  )
}

export default LanguagePicker