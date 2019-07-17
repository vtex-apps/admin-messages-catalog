import React, { FC } from 'react'
import { defineMessages, InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl'
import { FIELDS_TO_CSV_DESC, TranslatableField } from '../utils/constants'

const {
  description,
  descriptionShort,
  keywords,
  metaTagDescription,
  name,
  titleTag,
} = defineMessages({
  description: { defaultMessage: '', id: 'admin/messages.catalog.description' },
  descriptionShort: { defaultMessage: '', id: 'admin/messages.catalog.descriptionShort' },
  keywords: { defaultMessage: '', id: 'admin/messages.catalog.keywords' },
  metaTagDescription: { defaultMessage: '', id: 'admin/messages.catalog.metaTagDescription' },
  name: { defaultMessage: '', id: 'admin/messages.catalog.name' },
  titleTag: { defaultMessage: '', id: 'admin/messages.catalog.titleTag' },
})

function getFieldMessage(field: TranslatableField, intl: InjectedIntl) {
  switch(field) {
  case 'description':
    return intl.formatMessage(description)
  case 'descriptionShort':
    return intl.formatMessage(descriptionShort)
  case 'keywords':
    return intl.formatMessage(keywords)
  case 'metaTagDescription':
    return intl.formatMessage(metaTagDescription)
  case 'name':
    return intl.formatMessage(name)
  case 'titleTag':
    return intl.formatMessage(titleTag)
  }
}

interface Props extends InjectedIntlProps {
  field: TranslatableField 
}

const ColumnDescription: FC<Props> = ({field, intl}) => {
  return (
    <p>
      <span className="mr3 fw5">
        {FIELDS_TO_CSV_DESC[field]}
      </span>{' '}
      <span className="f6">{getFieldMessage(field, intl)}</span>
    </p>
  )
}

export default injectIntl(ColumnDescription)