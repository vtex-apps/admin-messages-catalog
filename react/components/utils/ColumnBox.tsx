import React, { FC } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { Box } from 'vtex.styleguide'
import { Entity, ENTITY_FIELDS } from '../../utils/constants'

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

const brandMessages = defineMessages({
  metaTagDescription: { defaultMessage: '', id: 'admin/messages.catalog.brand.metaTagDescription' },
  name: { defaultMessage: '', id: 'admin/messages.catalog.brand.name' },
  title: { defaultMessage: '', id: 'admin/messages.catalog.brand.title' },
})

const categoryMessages = defineMessages({
  MetaTagDescription: { defaultMessage: '', id: 'admin/messages.catalog.category.metaTagDescription' },
  Title: { defaultMessage: '', id: 'admin/messages.catalog.category.title' },
  name: { defaultMessage: '', id: 'admin/messages.catalog.category.name' },
})

const entityMessages: Record<Entity, ReactIntl.Messages> = {
  brand: brandMessages,
  category: categoryMessages,
  product: productMessages,
  sku: skuMessages,
  specification: {},
}

interface ColumnProps extends InjectedIntlProps {
  entity: Entity
  field: string 
}

const ColumnDescription: FC<ColumnProps> = ({ entity, field, intl }) => {
  return (
    <p>
      <span className="mr3 fw5">{ENTITY_FIELDS[entity][field]}</span>{' '}
      <span className="f6">{intl.formatMessage(entityMessages[entity][field])}</span>
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