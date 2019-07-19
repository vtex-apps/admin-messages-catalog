import React from 'react'
import { defineMessages, InjectedIntlProps } from 'react-intl'
import { Entity } from '../../utils/constants'
import ColumnBox from './ColumnBox'
import Instruction from './Instruction'

const productMessages = defineMessages({
  instruction1: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction1',
  },
  instruction2: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction2',
  },
  instruction3: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction3',
  },
  instruction4: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction4',
  },
  instruction5: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction5',
  },
})

interface Props extends InjectedIntlProps {
  entity: Entity
}

const CatalogRemainingInstructions = ({ entity, intl }: Props) => (
  <>
    <Instruction intl={intl} message={productMessages.instruction2} />
    <Instruction intl={intl} message={productMessages.instruction3} />
    <div>
      <Instruction intl={intl} message={productMessages.instruction4} />
      <ColumnBox entity={entity} />
    </div>
    <Instruction intl={intl} message={productMessages.instruction5} />
  </>
)

export default CatalogRemainingInstructions
