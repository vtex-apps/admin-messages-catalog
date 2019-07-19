import React from 'react'
import { defineMessages, InjectedIntlProps } from 'react-intl'
import { Entity } from '../../utils/constants'
import ColumnBox from './ColumnBox'
import Instruction from './Instruction'

const messages = defineMessages({
  instruction1: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.instruction1',
  },
  instruction2: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.instruction2',
  },
  instruction3: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.instruction3',
  },
  instruction4: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.instruction4',
  },
  instruction5: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.instruction5',
  },
})

interface Props extends InjectedIntlProps {
  entity: Entity
}

const CatalogRemainingInstructions = ({ entity, intl }: Props) => (
  <>
    <Instruction intl={intl} message={messages.instruction2} />
    <Instruction intl={intl} message={messages.instruction3} />
    <div>
      <Instruction intl={intl} message={messages.instruction4} />
      <ColumnBox entity={entity} />
    </div>
    <Instruction intl={intl} message={messages.instruction5} />
  </>
)

export default CatalogRemainingInstructions
