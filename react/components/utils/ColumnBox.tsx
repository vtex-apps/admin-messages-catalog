import React, { FC } from 'react'
import { defineMessages, InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl'
import { Box } from 'vtex.styleguide'
import { Entity, ENTITY_FIELDS, ProductTranslatableField, SKUTranslatableField } from '../../utils/constants'

const productMessages = defineMessages({
  description: { defaultMessage: '', id: 'admin/messages.catalog.product.description' },
  descriptionShort: { defaultMessage: '', id: 'admin/messages.catalog.product.descriptionShort' },
  keywords: { defaultMessage: '', id: 'admin/messages.catalog.product.keywords' },
  metaTagDescription: { defaultMessage: '', id: 'admin/messages.catalog.product.metaTagDescription' },
  name: { defaultMessage: '', id: 'admin/messages.catalog.product.name' },
  titleTag: { defaultMessage: '', id: 'admin/messages.catalog.product.titleTag' },
})

const skuMessages = defineMessages({
  name: { defaultMessage: '', id: 'admin/messages.catalog.sku.name' },
  nameComplete: { defaultMessage: '', id: 'admin/messages.catalog.sku.name-complete' },
})

function getFieldMessage(entity: Entity, field: string, intl: InjectedIntl) {
  if (entity === 'product') {
   const x =  field
  }

  switch(entity) {
    case 'product':
      return intl.formatMessage(productMessages[field as ProductTranslatableField])
    case 'sku':
      return intl.formatMessage(skuMessages[field as SKUTranslatableField])
    default:
      return ''
  }
}

interface ColumnProps extends InjectedIntlProps {
  entity: Entity
  field: string 
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
  return Object.keys(ENTITY_FIELDS[entity])
}

const ColumnsBox: FC<Props> = ({ entity, intl }) => (
  <Box noPadding>
    <div className="c-muted-1 ph5 pv2">
      {getTranslatableFields(entity).map((field: string) => (
        <ColumnDescription
          entity={entity}
          field={field}
          intl={intl}
          key={field}
        />
      ))}
    </div>
  </Box>
)

export default injectIntl(ColumnsBox)