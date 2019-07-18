import React, { FC } from 'react'
import { defineMessages, InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl'
import { Box } from 'vtex.styleguide'
import { Entity, ENTITY_FIELDS, ProductTranslatableField } from '../../utils/constants'

const productMessages = defineMessages({
  description: { defaultMessage: '', id: 'admin/messages.catalog.description' },
  descriptionShort: { defaultMessage: '', id: 'admin/messages.catalog.descriptionShort' },
  keywords: { defaultMessage: '', id: 'admin/messages.catalog.keywords' },
  metaTagDescription: { defaultMessage: '', id: 'admin/messages.catalog.metaTagDescription' },
  name: { defaultMessage: '', id: 'admin/messages.catalog.name' },
  titleTag: { defaultMessage: '', id: 'admin/messages.catalog.titleTag' },
})

function getFieldMessage(entity: Entity, field: ProductTranslatableField, intl: InjectedIntl) {
  switch(entity) {
    case 'product':
      return intl.formatMessage(productMessages[field])
    default:
      return ''
  }
}

interface ColumnProps extends InjectedIntlProps {
  entity: Entity
  field: ProductTranslatableField 
}

const ColumnDescription: FC<ColumnProps> = ({ entity, field, intl }) => {
  return (
    <p>
      <span className="mr3 fw5">{ENTITY_FIELDS[entity][field]}</span>{' '}
      <span className="f6">{getFieldMessage(entity, field, intl)}</span>
    </p>
  )
}

interface Props extends InjectedIntlProps {
  entity: Entity
}

const getTranslatableFields = (entity: Entity) => {
  switch(entity) {
    case 'product':
      return Object.values(ProductTranslatableField)
    default:
      return []
  }
}

const ColumnsBox: FC<Props> = ({ entity, intl }) => (
  <Box noPadding>
    <div className="c-muted-1 ph5 pv2">
      {getTranslatableFields(entity).map((field: ProductTranslatableField) => (
        <ColumnDescription entity={entity} field={field} intl={intl} key={field} />
      ))}
    </div>
  </Box>
)

export default injectIntl(ColumnsBox)